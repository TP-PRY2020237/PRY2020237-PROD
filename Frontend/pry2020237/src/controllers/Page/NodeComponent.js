import ButtonComponentTemplate from "@/views/ComponentsTemplate/ButtonComponentTemplate";
import InputComponentTemplate from "@/views/ComponentsTemplate/InputComponentTemplate";
import CheckComponentTemplate from "@/views/ComponentsTemplate/CheckComponentTemplate";
import RadioComponentTemplate from "@/views/ComponentsTemplate/RadioComponentTemplate";
import SelectComponentTemplate from "@/views/ComponentsTemplate/SelectComponentTemplate";
import ImageComponentTemplate from "@/views/ComponentsTemplate/ImageComponentTemplate";
import TextComponentTemplate from "@/views/ComponentsTemplate/TextComponentTemplate";
import TextAreaComponentTemplate from "@/views/ComponentsTemplate/TextAreaComponentTemplate";
import InputNumberComponentTemplate from "@/views/ComponentsTemplate/InputNumberComponentTemplate";
const  ElementsName = {
    Text: 'Text',
    CircleImage: 'Circle Image',
    SquareImage: 'Square Image',
    Input: 'Input',
    ComboBox: 'Combo Box',
    RadioButton: 'Radio Button',
    CheckBox: 'CheckBox',
    Button: 'Button',
    InputNumber: 'Input Number',
    TextArea: 'Text Area'
}
export default {
    name: "NodeComponent",
    props:{
        child:{},
        componentSelected: {},
        selected: Boolean

    },

    components: {
        ButtonComponentTemplate,
        CheckComponentTemplate,
        InputComponentTemplate,
        RadioComponentTemplate,
        SelectComponentTemplate,
        ImageComponentTemplate,
        TextComponentTemplate,
        TextAreaComponentTemplate,
        InputNumberComponentTemplate,
    },

    methods:{

        getWidth(){
            if (this.child.type === 'Element'){
                if (this.child.element.componentType.name ===ElementsName["Text"] ||
                this.child.element.componentType.name === ElementsName["ComboBox"] || 
                this.child.element.componentType.name === ElementsName["RadioButton"] || 
                this.child.element.componentType.name === ElementsName["CheckBox"] || 
                this.child.element.componentType.name === ElementsName["InputNumber"]
                ){
                    return 'fit-content'
                } else {
                    return '100%'
                }
            }
            return null
        },

        getHeight(){
            if (this.child.type === 'Element'){
                if (this.child.element.componentType.name ===ElementsName["Text"] ||
                this.child.element.componentType.name === ElementsName["Input"] || 
                this.child.element.componentType.name === ElementsName["ComboBox"] || 
                this.child.element.componentType.name === ElementsName["RadioButton"] || 
                this.child.element.componentType.name === ElementsName["CheckBox"] || 
                this.child.element.componentType.name === ElementsName["InputNumber"] ||
                this.child.element.componentType.name === ElementsName["Button"]
                ){
                    return 'fit-content'
                } else {
                    return '100%'
7                }
            }
            return null
        },

        assignCol(){
            if (this.child.type !== 'Element'){
                return (this.child.childrens.filter(e => e.type === "Element"))
            }
            return []
        },

        classNames(){
            let className = { 
                'row': this.child.type === 'Column',
                'row': this.assignCol().length < 1,
            }
            className[`col-${this.child.width}`] =  true
            return className
        },

        styles(){
            let styles = {
                border: ( this.child.element !== null ) ? ( this.child.element.id == this.componentSelected.id ? '1px solid red' : '') : '',
            }

            if (this.assignCol().length < 1) {
                styles["padding"] = '10px !important'
            }
            if  (this.child.type ==="Column"){
                styles["display"] = 'block'
            }

            return styles
        },
        id(){
            return `${this.child.uuid}-component`
        }
        
    }
}