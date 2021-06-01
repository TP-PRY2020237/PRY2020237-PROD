export class Row {
    elementsHTML;

    constructor(){
        this.elementsHTML = [];
    }

    asignElement(elemenstHTML){
        this.elementsHTML = [...this.elementsHTML, ...elemenstHTML]
    }
}