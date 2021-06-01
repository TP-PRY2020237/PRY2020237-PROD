
  import axios from 'axios';
  //import func from 'vue-editor-bridge';
  //import { component } from 'vue/types/umd';
  //Ponemos el NamePage, en index.js lo configuramos, se debe configurar tmb que lo pase con un parámetro
  export default {
  components: {  },
    props: {
      NamePage :{
        type: String
      },
      PageViewId:{
        type: String
    },
    },
    data: () => ({
      enabled : false,
      v0 : true,
      parameterId : "init",
      drawer : true,
      projects : [],
      pageViews:[],
      resultsToCar:[],
      pageViews2 : [],

      dialog : false,

      iconeliminar : true,
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
      idProject : 0,
      //Model
      id: "",
      name: "",
      description: "",
      createDate: "",
      modifyDate: "",
      themeNumber:0,
      img:"",
      refHtml: "",
      projectId: "",
      isPrincipal: false,
      model: 0,
      cssFileName: "",
      tokenDataTrue:"",
      items: [{
            id: "1",
            content: '<meta name="viewport" content="width=device-width"><title>Wire2Web</title><div class="container body-content"><div><div data-v-7b8d827e="" class="container" style="position: relative; height: 700px;"><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 26.5006%; height: 25.2102px;"><div data-v-7b8d827e="" style="height: 100%; width: 100%;"><div data-v-41058465="" data-v-7b8d827e=""><label data-v-41058465="" style="font-size: 16px;"> Lorem Ipsum </label></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 20.1743%; height: 43.5032px;"><div data-v-7b8d827e=""><div data-v-3c717004="" data-v-7b8d827e=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div></div><div data-v-7b8d827e="" class="col" style="width: 26.5006%; height: 25.2102px;"><div data-v-7b8d827e="" style="height: 100%; width: 100%;"><div data-v-41058465="" data-v-7b8d827e=""><label data-v-41058465="" style="font-size: 16px;"> Lorem Ipsum </label></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 29.8087%; height: 104.91px;"><div data-v-7b8d827e="" style="height: 100%; width: 100%;"><img data-v-23cea4de="" data-v-7b8d827e="" src="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" title="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" alt="" width="100%" height="100%" class=""></div></div><div data-v-7b8d827e="" class="col" style="width: 18.761%; height: 34.3492px;"><div data-v-7b8d827e=""><div data-v-3c717004="" data-v-7b8d827e=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div></div><div data-v-7b8d827e="" class="col" style="width: 18.1666%; height: 43.1751px;"><div data-v-7b8d827e=""><div data-v-d3cbb21e="" data-v-7b8d827e=""><label data-v-d3cbb21e=""><input data-v-d3cbb21e="" type="radio" name="" value=""> Lorem Ipsum </label></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 21.3092%; height: 52.75px; border: 1px solid red;"><div data-v-7b8d827e=""><div data-v-26ecaa82="" data-v-7b8d827e=""><input data-v-26ecaa82="" type="text" placeholder="Inserta nombre" class="form-control"></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 22.675%; height: 57.4906px;"><div data-v-7b8d827e=""><div data-v-70ca6f36="" data-v-7b8d827e=""> <select data-v-70ca6f36="" name="" class="custom-select"><option data-v-70ca6f36="" value=" "> Lorem Ipsum</option> </select></div></div></div><div data-v-7b8d827e="" class="col" style="width: 21.3092%; height: 52.75px; border: 1px solid red;"><div data-v-7b8d827e=""><div data-v-26ecaa82="" data-v-7b8d827e=""><input data-v-26ecaa82="" type="text" placeholder="Inserta nombre" class="form-control"></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 20.7883%; height: 51.8192px;"><div data-v-7b8d827e=""><div data-v-9bf4e70e="" data-v-7b8d827e=""><input data-v-9bf4e70e="" type="number" placeholder="Lorem Ipsum" class="form-control"></div></div></div><div data-v-7b8d827e="" class="col" style="width: 22.4341%; height: 48.2867px;"><div data-v-7b8d827e=""><div data-v-9bf4e70e="" data-v-7b8d827e=""><input data-v-9bf4e70e="" type="number" placeholder="Lorem Ipsum" class="form-control"></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 32.2834%; height: 121.527px;"><div data-v-7b8d827e="" style="height: 100%; width: 100%;"><img data-v-23cea4de="" data-v-7b8d827e="" src="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" title="https://raw.githubusercontent.com/Rodrigolara05/Wire2Web-Materials/main/images.png" alt="" width="100%" height="100%" class="rounded-circle"></div></div><div data-v-7b8d827e="" class="col" style="width: 19.8126%; height: 34.7019px;"><div data-v-7b8d827e=""><div data-v-3c717004="" data-v-7b8d827e=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div></div><div data-v-7b8d827e="" class="col" style="width: 19.0555%; height: 33.6717px;"><div data-v-7b8d827e=""><div data-v-3c717004="" data-v-7b8d827e=""><label data-v-3c717004=""><input data-v-3c717004="" type="checkbox" value=""> Lorem Ipsum </label></div></div></div><div data-v-7b8d827e="" class="col" style="width: 20.7901%; height: 31.9959px;"><div data-v-7b8d827e=""><div data-v-d3cbb21e="" data-v-7b8d827e=""><label data-v-d3cbb21e=""><input data-v-d3cbb21e="" type="radio" name="" value=""> Lorem Ipsum </label></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 59.3562%; height: 98.7119px;"><div data-v-7b8d827e=""><div data-v-0ce4fa50="" data-v-7b8d827e=""><textarea data-v-0ce4fa50="" height="100%" placeholder="Lorem Ipsum" class="form-control"> Lorem Ipsum </textarea></div></div></div></div><div data-v-7b8d827e="" class="row"><div data-v-7b8d827e="" class="col" style="width: 47.11%; height: 68.3688px;"><div data-v-7b8d827e="" style="height: 100%; width: 100%;"><div data-v-0e6fca80="" data-v-7b8d827e=""> <a data-v-0e6fca80="" @click="fucker" class="btn btn-secondary" style="color: white; width: 100%;"> Enlace a vista2 </a></div></div></div></div></div></div></div> '},
            { id: "2",
            content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zjcVPZCG4sM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'},
            {
              id:"3",
              src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
            },/*
            {
               id:"4",
              src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
            },
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
    mounted(){
      document.title = "Wire2Web - Previsualización"
  },
    created(){
      
      this.listar();
    },
    methods : {
        showViews (){
          let me = this;
          var urlsToGet = [];
          var pageViewsFake = [];
          me.resultsToCar = [];
          /*
          var currentUrl = window.location.pathname; //para saber el path
          var originUrl = window.location.origin;
          //alert(originUrl + currentUrl);
          var pathReal = originUrl + currentUrl ;//path del despliegue
          var x = currentUrl.length;
          var y = x + 11;
          var realName = currentUrl.substring(13); */ 
          var realName = this.$route.params.NamePage; //Se obtiene el value del params

          me.pageViews.forEach(function(pageview, index){
            if(pageview.htmlUrl!=null && pageview.htmlUrl!="") {
                    //urls.push(pageview.htmlUrl);
                    //namesFiles.push(pageview.name);
                    urlsToGet.push(pageview.htmlUrl);
                }
          })

          urlsToGet.forEach(function(newUrl, index){
            axios.defaults.headers = {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            };
              axios.get(newUrl)
                    .then(function(response){
                          //pageViewsFake = response.data;
                          var cd = response.data.split("border: 1px solid red;").join(""); //magic :D
                          var cadena = cd;
                         if (newUrl.includes(realName)){ //solo obtiene el url del que está en el path

                            var ocurrenciasIndex = [];
                            var position = 0;

                            function contarOcurrencias (cadena, subcadena){
                                while((position = cadena.indexOf(subcadena, position)) !== -1){
                                    var word = "";
                                    for (var u = position  ; u < position + 8; u++){
                                        
                                        word += cadena[u];
                                    }
                                    
                                    if (word != "http")
                                        ocurrenciasIndex.push(position);
                                    position += subcadena.length;
                                }
                                
                            }
                            contarOcurrencias(cadena, "data-url");
                             // numberThemeGlobal
                            switch (me.themeNumber){
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

                            var contador = 0;
                            var finalUrl = "";
                            var arrFinalUrl = [];
                            
                            var path = window.location.origin;
                            if (ocurrenciasIndex.length == 0){
                              finalUrl = cadena;
                              
                              var finalUrl2 = "";
                                var ffa =  finalUrl.substring(contador, 77);
                                var ffi ='<link rel="stylesheet" type="text/css" href="' + path + '/resources/theme/' + me.cssFileName+ '"> </head> <body> '; //el intermedio, lo que se puede agregar
                                //var ffstyle = ' <link rel="stylesheet" type="text/css" href="../../../public/resources/bootstrap-blue.min.css">';
                                var ffb =  finalUrl.substring(289);
                                
                                //finalUrl2 = ffa + " " + ffi + " " + ffb;
                                finalUrl2 = ffa + " "+ ffi + " "+ ffb /*+ ffstyle */;
                                arrFinalUrl.push(finalUrl2);
                            }
                            else{
                              ocurrenciasIndex.forEach(function(valor, index){
                              //https://joomla.stackexchange.com/questions/13928/redirect-to-another-page-outside-iframe-wrapper
                                var fa = cadena.substring(contador, valor);
                                var fmid = ' data-url="' + path + '/pagePreview/' + me.$route.params.PageViewId + '/';
                                var fm = cadena.substring(valor + 10);
                                finalUrl = fa + ""+ fmid  + "" + fm;
                                //acá, lo de quitar el link
                                var finalUrl2 = "";
                                var ffa =  finalUrl.substring(contador, 77);
                                var ffi ='<link rel="stylesheet" type="text/css" href="' + path + '/resources/theme/' + me.cssFileName+ '"> </head> <body> '; //el intermedio, lo que se puede agregar
                                //var ffstyle = ' <link rel="stylesheet" type="text/css" href="../../../public/resources/bootstrap-blue.min.css">';
                                var ffb =  finalUrl.substring(289);
                                //finalUrl2 = ffa + " " + ffi + " " + ffb;
                                finalUrl2 = ffa + " "+ ffi + " "+ ffb /*+ ffstyle */;
                                arrFinalUrl.push(finalUrl2);
                            })
                            }
                            /*if(ocurrenciasIndex.length == 0){
                              arrFinalUrl.push(response.data);
                            }*/
                            me.resultsToCar.splice(0,0,arrFinalUrl[0]);
                          }
                          else {
                            //me.resultsToCar.push(response.data);
                          }
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
          
          
        },
        listar() {
            let me = this;
            //alert(typeof(parseInt(localStorage.getItem("dateNow"))) + "- " + parseInt(localStorage.getItem("dateNow")));
            
            //var pid = 0;
            var ProjectIdPreview = 0;
            if (localStorage.getItem("tokenDataTrue") != null) {
              
               me.tokenDataTrue = localStorage.getItem("tokenDataTrue");

                //ProjectIdPreview = JSON.parse(localStorage.getItem("ProjectIdPreview"));
                me.idProject = parseInt(this.$route.params.PageViewId);
                
            }else{
            }
            
            axios
                .get("api/PageView/project/" + me.idProject, {
                     headers:{
                        Authorization : 'Bearer ' + me.tokenDataTrue
                     }
                })
                .then(function (response) {
                    var pageViewsJoke = response.data ;

                    pageViewsJoke.forEach(function(pv, index){

                      if(pv.isPrincipal == true){
                        me.pageViews.splice(0,0,pv)
                      }
                      else{
                        me.pageViews.push(pv);
                      }
                      
                    })
                    //acá ejecutaríamos la función del get string
                    axios.get("api/Project/" + me.idProject, { headers: {
                      Authorization : 'Bearer ' + me.tokenDataTrue
                      }}).then(function(response){
                        me.themeNumber = response.data.themeNumber;
                        //alert(me.themeNumber);
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


    }
  }
