import { v4 as uuidv4 } from 'uuid';

export class Node {
    type;
    childrens;
    element;
    isAlign;
    width;
    level;
    uuid;
    isDeletable;
    constructor(type,childrens, element, isAlign= false, isDeletable = false){
        this.type           = type;
        this.childrens      = childrens;
        this.element        = element;
        this.isAlign        = isAlign;
        this.width          = null;
        this.level          = null;
        this.uuid           = uuidv4()
        this.isDeletable    = isDeletable
    }
}