
export class ElementController {
  elementsHTML;
  constructor(elements) {
    this.elementsHTML = elements;
    // this.alignElements()
  }

  alignElements(){
    this.elementsHTML.forEach(e => {
        e.attributesJson.boundingBox.top  = this.findCloseValueBy10Multiple(e.attributesJson.boundingBox.top * 100)
        e.attributesJson.boundingBox.left = this.findCloseValueBy10Multiple(e.attributesJson.boundingBox.left * 100)
    });
  }

  findCloseValueBy10Multiple(val) {
    const findCloseValue = Math.floor(val / 10);
    return findCloseValue * 10 / 100;
  }
}

