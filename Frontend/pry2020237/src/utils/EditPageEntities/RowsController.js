import { Row } from "./Row";

export class RowsController {
    rows;
    scannerThreshold;
    scannerHeight;
    scannerTop;
    elementsHtml = [];
    constructor(elementsHtml){
        this.rows = []
        this.scannerThreshold = 0.03
        this.elementsHtml = elementsHtml;
        this.orderElementsByTop()
        this.organizeElementsByRow()
        this.orderElementsByLeft()
    }

    orderElementsByLeft(){
        this.rows.forEach(e =>{            
            e.elementsHTML.sort((a,b) => a.attributesJson.boundingBox.left > b.attributesJson.boundingBox.left ? 1 : -1)
        })
    }

    orderElementsByTop(){
        this.elementsHtml.sort((a,b) => a.attributesJson.boundingBox.top > b.attributesJson.boundingBox.top ? 1 : -1)
    }

    organizeElementsByRow(){
       for(let i = 0; i< this.elementsHtml.length ; ++i){
           const results = this.searchAnotherElementInSameRow(this.elementsHtml[i])
            if(results.length){
                const row =  new Row();
                row.asignElement(results)
                this.rows.push(row)
            }
       }
    }

    searchAnotherElementInSameRow(element) {

        let allElementsPerRow = []

        if(!this.isElementAdded(element)){
            allElementsPerRow.push(element)
            this.scannerTop         =  element.attributesJson.boundingBox.top
            this.scannerHeight      =  element.attributesJson.boundingBox.height
            allElementsPerRow       =  [element,...this.findElementsInRow(element)]
        } 

        return allElementsPerRow
    }

    isElementAdded(element){
        let isFound = false;

        this.rows.forEach(row => {
            const target =  row.elementsHTML.find(f => f === element)
            target ?  isFound =  true : null;
        })
        return isFound
    }

    findElementsInRow(elementExclude){
        let results = [];
        this.elementsHtml.forEach(e => {
            if (e !==  elementExclude && !this.isElementAdded(e)) {
                const {top,height} = e.attributesJson.boundingBox;                
                if (this.isTopPositionInsideScanner(top)){                                   
                    if (height > this.scannerHeight) this.updateScannerThreshold(height)
                    results.push(e)
                }
            }
        })
        return results;
    }

    isTopPositionInsideScanner(top){
        return (top >= this.scannerTop - this.scannerThreshold &&
                top  <= this.scannerHeight + this.scannerTop  )
    }

    updateScannerThreshold(newHeight){
        this.scannerHeight = newHeight;
    }
}