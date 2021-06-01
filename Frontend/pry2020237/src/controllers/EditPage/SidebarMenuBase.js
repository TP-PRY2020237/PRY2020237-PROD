import { LocalizationES } from '@/Entities/LocalizationES'
import { Node } from '../../utils/EditPageEntities/Node';
import { Tree } from '../../utils/EditPageEntities/Tree';
import { v4 as uuidv4 } from 'uuid';


const ELEMENTS_DICTIONARY = {
    'Boton': 'Button',
    'Imagen Cuadrada': 'Square Image',
    'Imagen Circular': 'Circle Image',
    'Input': 'Input',
    'Combo Box': 'Combo Box',
    'Radio Button': 'Radio Button',
    'Checkbox': 'CheckBox',
    'Texto': 'Text',
    'Input número': 'Input Number',
    'Text de area': 'Text Area'
}

export default {
    name: 'EditPageSidebarMenu',
    props: {
        child: {},
        componentSelected: {},
        editableState: Boolean,
        tree: {},
        componentDataDictionary: Array,
        pageViewId: String
        
    },
    model: {
        event: 'selectChild'
      },

    data: () =>({
        isChildContainerOpen: false,
        isShowingElementButton: true,
        newElements: [],
        iconDropdown: 'expand_more',
        components: [
            'Boton',
            'Imagen Cuadrada',
            'Imagen Circular',
            'Input',
            'Combo Box',
            'Radio Button',
            'Checkbox',
            'Texto',
            'Input número',
            'Text de area'
        ],
        newElementForTree: ""
    }),

    methods: {
        styles(){
            let styles =  {
                marginLeft: this.editableState ? `${(this.child.level) * 12}px` : `8px`,
                background: this.child.element === this.componentSelected ?  '#1976D2' : '#FFFFFF',
                color: this.child.element === this.componentSelected ?  '#ffffff' : '#000000',
                width: this.editableState ? `calc(100% - ${(this.child.level) * 12}px)` : `calc(100% - 8px)`,
            }
            return styles;
        },
        classNames(){
            let className = {
                'item item-no-active': this.child.element !== this.componentSelected,
                'item item-active': this.child.element == this.componentSelected
            }

            return className;
        },
        stylesLinesIndicators(){
            let styles =  {
                marginLeft: this.editableState ? `${(this.child.level) * 12}px` : `8px`,
                // width: this.editableState ? `calc(100% - ${(this.child.level) * 12}px)` : `calc(100% - 8px)`,
            }
            return styles;
        },

        stylesLeftLinesIndicators(){
            let styles =  {
                marginLeft: this.editableState ? `${(this.child.level) * 12}px` : `8px`,
                // width: this.editableState ? `calc(100% - ${(this.child.level) * 12}px)` : `calc(100% - 8px)`,
            }
            return styles;
        },
        stylesButton(){
            let styles =  {
                paddingLeft: this.editableState ? `${(this.child.level + 1) * 15}px` : `8px`,
            }
            return styles;
        },

        isFirstLevel(){
            return this.child.level === 1
        },

        showDropDown() {
            this.isChildContainerOpen = !this.isChildContainerOpen
            if(this.child.type === 'Element'){
                this.parent(this.child)
            }

            if(this.isChildContainerOpen){
                this.iconDropdown = 'expand_less'
            } else {
                this.iconDropdown = 'expand_more'
            }


        },

        GetTextInSpanish(text){
            let nameCleaned = text.replace(/\s+/g, '');
            const result = LocalizationES[nameCleaned];
            if (result==null) {
                return text;
            }
            return result;
        },
        parent(c){
            this.$emit('select-component', c)
        },

        openSelectElement(){
            this.isShowingElementButton =  false
        },
        addElement(){

            let dataTarget =  this.componentDataDictionary.find(e => e.name === ELEMENTS_DICTIONARY[this.newElementForTree])
            const newTree = new Tree([],this.tree)
          
            let componentType = dataTarget
            const element = {
                attributesJson: this.composeAttributeJson(dataTarget),
                componentType: componentType,
                componentTypeId: dataTarget.id,
                id: uuidv4(),
                pageView:null,
                pageViewId:this.pageViewId
            }

            

            const elementNode =  new Node("Element",[],element,false, true)
            const nodeRow = new Node("Row",[elementNode],null,true)
            nodeRow.level =  this.child.level
            nodeRow.width = 12
            this.child.childrens.push(nodeRow)
            
            newTree.setWidthParentNodes(this.tree)
            newTree.setLevelsValueToNodes(this.tree)
            this.isShowingElementButton = true
        },
        selectElement(elementSelected) {
            this.newElementForTree = elementSelected
        },
        cancelAddElement(){
            this.isShowingElementButton = true
        },
        isChildrensHasElementsChildrens(){
            if (this.child.type !== 'Element'){
                let  isValidForShow = false;

                for( let i =0; i< this.child.childrens.length; ++i){
                    if (this.child.childrens[i].element === null){
                        isValidForShow = true;
                    }
                }

                return isValidForShow
            }
            return false
        },
        removeElement() {
            const newTree = new Tree([], this.tree)

            newTree.removeElementFromTree(this.tree,this.child)
            newTree.setWidthParentNodes(this.tree)
            newTree.setLevelsValueToNodes(this.tree)
            
        },
        composeAttributeJson(dataTarget){
            return {
                boundingBox: {
                    height: 0,
                    left: 0,
                    top: 0,
                    width: 0
                },
                component: ELEMENTS_DICTIONARY[this.newElementForTree],
                data: (JSON.parse(dataTarget.atributesJson).data)
            }
        },

        distributionType(){
            if (this.child.type === 'Row'){
                return "Fila"
            }
            return "Columna"
        },

        idComponentLefSide(){
            return `${this.child.uuid}-menu`;
        }

    }
}