
import axios from 'axios';
  //import func from 'vue-editor-bridge';
  //import { component } from 'vue/types/umd';
  export default {
  components: {  },
    props: {
      PageViewId:{
        type: String
    },
  },
    data: () => ({
      enabled : false,
      v0 : true,
      parameterId : "init",
      drawer : true,
      idProject : 0,
      projects : [],
      pageViews:[],
      resultsToCar:[],
      pageViews2 : [],
      dialog : false,
      iconeliminar : true,
      globaldelcolor: 0, //por defecto es el blanco, theme
      globaldelcolor2 : 0, //se obtendrá de pageviewBase.js
      validadorCss : false, //validador de si ha escogido algún theme
      cssFileName: "", //nombre del css file
      headers: [{
                text: "Opciones",
                value: "opciones",
                sortable: false
            },
            {
                text: "name",
                value: "name",
                sortable: false
            },
            {
                text: "description",
                value: "description",
                sortable: false
            },
            {
                text: "createDate",
                value: "createDate"
            },
            {
                text: "modifyDate",
                value: "modifyDate"
            },
            /*         { text: "userId", value: "userId" } */
        ],
      desserts : [],
      search : '',
      editedIndex: -1,
      globColDarly : 0,
      globColTmp : -1,
      //Model
      id: "",
      name: "",
      description: "",
      createDate: "",
      modifyDate: "",
      tokenDataTrue:"",
      userId:"",
      themeNumber:"",
      img:"",
      refHtml: "",
      projectId: "",
      isPrincipal: false,
      model: 0,
      codePrueba:'<meta name="viewport" content="width=device-width"> <title>Wire2Web</title> <link rel="stylesheet" href="http://localhost:8080/resources/theme/bootstrap-solar.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">   <div class="container body-content"><div class="mt-8 pt-8"><div data-v-7b8d827e=""><div data-v-7b8d827e="" class="container" style="position: relative; height: 700px; overflow: auto;"><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-41058465="" data-v-6b1d25d4=""><label data-v-41058465="" style="font-size: 16px;"> Lorem Ipsum </label></div></div><!----><!----><!----><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-3"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: 100%; padding: 0px !important;"><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><img data-v-23cea4de="" data-v-6b1d25d4="" src="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" title="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" alt="" width="100%" class=""></div><!----><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-3"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-26ecaa82="" data-v-6b1d25d4=""><input data-v-26ecaa82="" type="text" placeholder="Inserta nombre" class="form-control"></div></div><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-3"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-d3cbb21e="" data-v-6b1d25d4=""><label data-v-d3cbb21e=""><input data-v-d3cbb21e="" type="radio" name="" value=""> Lorem Ipsum </label></div></div><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Column" class="row col-3" style="padding: 0px !important; display: block;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-70ca6f36="" data-v-6b1d25d4=""><select data-v-70ca6f36="" name="" class="custom-select"><option data-v-70ca6f36="" value=" "> Lorem Ipsum</option></select></div></div><!----><!----><!----><!----><!----></div></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-9bf4e70e="" data-v-6b1d25d4=""><input data-v-9bf4e70e="" type="number" placeholder="Lorem Ipsum" class="form-control"></div></div><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-9bf4e70e="" data-v-6b1d25d4=""><input data-v-9bf4e70e="" type="number" placeholder="Lorem Ipsum" class="form-control"></div></div><!----></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-4"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: 100%; padding: 0px !important;"><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><img data-v-23cea4de="" data-v-6b1d25d4="" src="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" title="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" alt="" width="100%" class="rounded-circle"></div><!----><!----><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-4"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-d3cbb21e="" data-v-6b1d25d4=""><label data-v-d3cbb21e=""><input data-v-d3cbb21e="" type="radio" name="" value=""> Lorem Ipsum </label></div></div><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Column" class="row col-4" style="padding: 0px !important; display: block;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: 100%; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-0ce4fa50="" data-v-6b1d25d4=""><textarea data-v-0ce4fa50="" height="100%" placeholder="Lorem Ipsum" class="form-control"> Lorem Ipsum </textarea></div></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important; border: 1px solid red;"><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-0e6fca80="" data-v-6b1d25d4=""><a data-v-0e6fca80="" href="Prueba3.html" class="btn btn-primary" style="color: white; width: 100%;"> Click me </a><!----></div></div><!----><!----></div></div></div></div></div></div></div>',
      items: [{ id: "2",
            content: '<div class="change" >Hola<div>'},
            {
               id:"4",
              content: '  <meta name="viewport" content="width=device-width"> <title>Wire2Web</title> <link rel="stylesheet" href="http://localhost:8080/resources/theme/bootstrap-blue.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">   <div class="container body-content"><div class="mt-8 pt-8"><div data-v-7b8d827e=""><div data-v-7b8d827e="" class="container" style="position: relative; height: 700px; overflow: auto;"><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-41058465="" data-v-6b1d25d4=""><label data-v-41058465="" style="font-size: 16px;"> Lorem Ipsum </label></div></div><!----><!----><!----><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-3"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: 100%; padding: 0px !important;"><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><img data-v-23cea4de="" data-v-6b1d25d4="" src="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" title="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" alt="" width="100%" class=""></div><!----><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-3"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-26ecaa82="" data-v-6b1d25d4=""><input data-v-26ecaa82="" type="text" placeholder="Inserta nombre" class="form-control"></div></div><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-3"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-d3cbb21e="" data-v-6b1d25d4=""><label data-v-d3cbb21e=""><input data-v-d3cbb21e="" type="radio" name="" value=""> Lorem Ipsum </label></div></div><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Column" class="row col-3" style="padding: 0px !important; display: block;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-70ca6f36="" data-v-6b1d25d4=""><select data-v-70ca6f36="" name="" class="custom-select"><option data-v-70ca6f36="" value=" "> Lorem Ipsum</option></select></div></div><!----><!----><!----><!----><!----></div></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-9bf4e70e="" data-v-6b1d25d4=""><input data-v-9bf4e70e="" type="number" placeholder="Lorem Ipsum" class="form-control"></div></div><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-6"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-9bf4e70e="" data-v-6b1d25d4=""><input data-v-9bf4e70e="" type="number" placeholder="Lorem Ipsum" class="form-control"></div></div><!----></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="row col-12" style="padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-4"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: 100%; padding: 0px !important;"><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><img data-v-23cea4de="" data-v-6b1d25d4="" src="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" title="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" alt="" width="100%" class="rounded-circle"></div><!----><!----><!----><!----><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-4"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-d3cbb21e="" data-v-6b1d25d4=""><label data-v-d3cbb21e=""><input data-v-d3cbb21e="" type="radio" name="" value=""> Lorem Ipsum </label></div></div><!----><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Column" class="row col-4" style="padding: 0px !important; display: block;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div><div data-v-6b1d25d4="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4=""><div data-v-3c717004="" data-v-6b1d25d4=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div><!----><!----><!----></div></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: 100%; padding: 0px !important;"><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-0ce4fa50="" data-v-6b1d25d4=""><textarea data-v-0ce4fa50="" height="100%" placeholder="Lorem Ipsum" class="form-control"> Lorem Ipsum </textarea></div></div></div></div></div><div data-v-7b8d827e="" class="m-2"><div data-v-6b1d25d4="" data-v-7b8d827e="" elemnt="Row" class="col-12"><!----><!----><!----><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" elemnt="Element" class="row col-12" style="height: fit-content; padding: 0px !important; border: 1px solid red;"><!----><!----><!----><!----><!----><!----><!----><div data-v-6b1d25d4="" style="height: 100%; width: 100%;"><div data-v-0e6fca80="" data-v-6b1d25d4=""><a data-v-0e6fca80="" href="Prueba3.html" class="btn btn-primary" style="color: white; width: 100%;"> Click me </a><!----></div></div><!----><!----></div></div></div></div></div></div></div>'
            },/*
            {
               id:"5",
              src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
            }*/
    ]
    }),
     computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nuevo Proyecto" : "Actualizar Proyecto";
        },
       
       /* obtener el nombre del proyecto */
       NameProject() {
            let objeto =this.projects;
            /* this.namePageView=objeto;
            return this.namePageView; */
            return objeto;
        },
   
        filteredProjects: function () {
            if (this.search == null) {
                this.search = "";
            }
            return this.pageViews.filter((item) => {
                return item.name.includes(this.search);
            });
        }
    },
    created(){
      this.listar();
    },

    mounted(){
        document.title = "Wire2Web - Escoger tema"
    },
    methods : {
      goBack() {
            //if (confirm("¿Estás seguro de eliminar los cambios realizados?")) {
            window.history.back();
            //}
        },
        showRemedy(colorName){
          this.globaldelcolor = colorName;
          this.globaldelcolor2 = colorName;
          //alert("Color seleccionado => " + colorName);
          //this.globaldelcolor = localStorage.getItem("themeGlobalVariable");
          //localStorage.setItem("globCol", colorName);
          this.globColTmp = colorName;
          //window.location = "/pageTheme/" + this.idProject;
          this.resultsToCar = [];
          this.listar();
        },
        showViews (){
          let me = this;
          var urlsToGet = [];
          let promises = [];
          me.pageViews.forEach(function(pageview, index){
            if(pageview.htmlUrl!=null && pageview.htmlUrl!="") {
                    urlsToGet.push([pageview.htmlUrl, pageview.isPrincipal]);
                }
          })
          /*
                         swithcase para agregar el <link al final de acuerdo al tema que ya tienen
          */
         //var globCol = JSON.parse(localStorage.getItem("globCol"));
          if (me.globColTmp == -1 ){
              var globCol = me.globColDarly;
          }
          else {  
            var globCol = me.globColTmp;
          }
         if (globCol == null){
           globCol = me.globColDarly;
         }
          switch (globCol){
              case 0 :
                      me.cssFileName ="bootstrap.css";
                      break;
              case 1 :
                      me.cssFileName ="bootstrap-blue.min.css";
                      break;
              case 2 :
                      me.cssFileName ="bootstrap-dark.min.css";
                      break;
              case 3 : 
                      me.cssFileName ="bootstrap-grey.min.css";
                      break;
              case 4 :
                      me.cssFileName ="bootstrap-pink.min.css";
                      break;
              case 5 :
                      me.cssFileName ="bootstrap-purpure.min.css";
                      break; 
              case 6 :
                       me.cssFileName ="bootstrap-solar.min.css";
                      break;
            }
          var path = window.location.origin;
          urlsToGet.forEach(function(newUrl, index){
              axios.get(newUrl[0])
                    .then(function(response){
                         /*
                         cod para eliminar el <link inicial
                         */
                         var ocurrenciasIndex = [];
                          var position = 0;
                          
                          var cd = response.data.split("border: 1px solid red;").join(""); //magic :D
                          var code = cd;
                                   
                          function contarOcurrencias (cadena, subcadena, arr){
                              while((position = cadena.indexOf(subcadena, position)) !== -1){
                                  var word = "";
                                  for (var u = position + 6 ; u < position + 10; u++){
                                      word += cadena[u];
                                  }
                                                              
                                  if (word != "<lin")
                                      arr.push(position);
                                  position += subcadena.length;
                              }
                                                          
                          }
                                  
                          contarOcurrencias(code, "<lin", ocurrenciasIndex);
                          var contador = 0;
                          var finalUrl = "";
                          
                          var arrFinalUrl = [];
                          ocurrenciasIndex.forEach(function(valor, index){
                              var fa = code.substring(contador, valor );
                              var fmid = '<link rel="stylesheet" type="text/css" href="' + path +'/resources/theme/' + me.cssFileName+ '"> </head> <body> ';
                              
                              var fm = code.substring(valor + 211);
                              finalUrl = fa + " " + fmid + " " + fm;
                              });
                          if(ocurrenciasIndex.length == 0){
                              finalUrl = code;
                          }
                          var codeFinal = finalUrl;
                         /*cod para eliminar 
                            los data-v-
                          
                          */ 
                          var ocurrenciasIndex = [];
                          var position = 0;
                          //contarOcurrencias(code, "data-v-");
                          var subcadena = "data-v-";
                          var nNew = 211;
                          while((position = codeFinal.indexOf(subcadena, position)) !== -1){
                                  var word = "";
                                  for (var u = position  ; u < position + 7; u++){
                                      word += codeFinal[u];
                                  }
                                                              
                                  if (word == "data-v-"){
                                      ocurrenciasIndex.push(position);
                                  }
                                      
                                  position += subcadena.length;
                              }
                         
                          //AHORA A QUITAR LA CADENA
                          var finalChain = ""; //contenedora del las partes finales
                          var contador = 0;
                          var finalUrl = "";
                          var arrFinalUrl = [];
                          var finalUrl2 = finalUrl;
                          var finalUrl3 = '<html> <head>' + finalUrl2 + ' </body> </html>';
                          //me.resultsToCar.push(codeFinal); //Acá entra el promises
                          promises.push([codeFinal, newUrl[1]]);
                    }).catch(function (error) {
                      if (error.response.status == 401){


                        me.$swal.fire({
                            title: 'Necesita autenticarse!!',
                            icon: 'warning',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = '/login';
                            }
                            })
                         /*  alert("Necesita autenticarse!!")
                          window.location = '/login'; */
                          
                    }
                }).finally(function(){
                    
                    if(promises.length == urlsToGet.length){
                        var tmp = "" ;
                        promises.forEach(function(value){
                            if(value[1] == true)
                                tmp = value[0];                            
                            else
                                me.resultsToCar.push(value[0])
                        })
                        me.resultsToCar.splice(0,0,tmp);
                    }
                });
          })
          
          
        },
        listar() {
            let me = this;
            
            //var pid = 0;
            //this.globaldelcolor = JSON.parse(localStorage.getItem("themeGlobalVariable"));
            //var ProjectIdPreview = 0;
            if (localStorage.getItem("tokenDataTrue") != null) {
              
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
                //ProjectIdPreview = JSON.parse(localStorage.getItem("ProjectIdPreview"));
                me.idProject = parseInt(this.$route.params.PageViewId);
            }
            
            axios
                .get("api/PageView/project/" + me.idProject, {
                     headers:{
                        Authorization : 'Bearer ' + me.tokenDataTrue
                     }
                })
                .then(function (response) {
                    
                    me.pageViews = response.data;
                    axios.get("api/Project/" + me.idProject, {
                     headers:{
                        Authorization : 'Bearer ' + me.tokenDataTrue
                     }
                    }).then(function(response){
                        //me.globaldelcolor2 = response.data.themeNumber;
                        //acá ejecutaríamos la función del get string
                        me.globColDarly = response.data.themeNumber;
                        //me.globColTmp = response.data.themeNumber;
                        me.showViews();
                    }).catch(function (error) {
                        if (error.response.status == 401){
                            me.$swal.fire({
                                title: 'Necesita autenticarse!!',
                                icon: 'warning',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location = '/login';
                                }
                          })
                            /* alert("Necesita autenticarse!!")
                            window.location = '/login'; */
                            
                        }
                    });
                    
                })
                .catch(function (error) {
                    if (error.response.status == 401){
                        me.$swal.fire({
                            title: 'Necesita autenticarse!!',
                            icon: 'warning',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = '/login';
                            }
                      })
                        /* alert("Necesita autenticarse!!")
                        window.location = '/login'; */
                        
                    }
                });
        },
        save(){
          //poner acá el save, que será el update en si, y que en localstorage se guarde?
            let me = this;
            var ProjectIdPreview = 0;
            var colorInt = me.globaldelcolor;
            //var globCol = parseInt(JSON.parse(localStorage.getItem("globCol")));
            var globCol = me.globColTmp;
            //alert(globCol);
            if (localStorage.getItem("tokenDataTrue") != null) {
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
                //ProjectIdPreview = JSON.parse(localStorage.getItem("ProjectIdPreview"));
                me.idProject = parseInt(this.$route.params.PageViewId);
            } 
            axios.get("api/Project/" + me.idProject, { headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }})
            .then(function(response){
                
                me.id = response.data.id;
                me.name = response.data.name;
                me.description = response.data.description;
                me.createDate = response.data.createDate;
                me.modifyDate = response.data.modifyDate;
                me.userId = response.data.userId;
                me.themeNumber = globCol;

                axios.put("api/Project", {
                  id: me.id,
                  name:  me.name,
                  description :  me.description,
                  createDate : me.createDate,
                  modifyDate : new Date(),
                  userId : me.userId,
                  themeNumber:globCol,
                }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function(response){
                    me.$swal.fire({
                        icon: 'success',
                        title: 'Guardado con éxito',
                        confirmButtonText: 'OK'
                    
                      }).then((result) => {
                       /* Read more about isConfirmed, isDenied below */
                       me.loadingSaveTemplate =  false
                       if (result.isConfirmed) {
                        window.location = '/pageView/'+ me.id;
                        
                       } 
                     })
                  }).catch(function (error) {
                        if (error.response.status == 401){

                            me.$swal.fire({
                                title: 'Necesita autenticarse!!',
                                icon: 'warning',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location = '/login';
                                }
                          })
                           /*  alert("Necesita autenticarse!!")
                            window.location = '/login'; */
                            
                        }
                    });
                
            })
            .catch(function (error) {
                if (error.response.status == 401){
                    me.$swal.fire({
                        title: 'Necesita autenticarse!!',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = '/login';
                        }
                  })
                    /*   alert("Necesita autenticarse!!")
                        window.location = '/login';
                             */
                }
            });
/*
            
*/
        },
    }
  }

