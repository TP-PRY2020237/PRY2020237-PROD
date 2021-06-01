import JsZip from "@/resources/jszip/dist/jszip.js";
import axios from "axios";
import JSZip from "jszip";
import JSZipUtils from 'jszip-utils'; 
import FileSaver from "file-saver";

export default {
  props: {
    PageViewId:{
      type: String
    },
  },
  data: () => ({
        enabled: false,
        v0: true,
        parameterId: "init",
        drawer: true,
        projects: [],
        pageViews: [],

        pageviews2:[],


        dialog: false,

        iconeliminar: true,
       
        globaldelcolor: 0, //por defecto es el blanco, theme
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
        nameRules: [(v) => !!v || "El nombre del proyecto es requerido",
            v => (v && v.length <= 15) || 'El nombre del proyecto debe contener máximo 15 caracteres',
            v => (v || '').indexOf(' ') < 0 || 'No se permiten espacios',
        ],
        desserts: [],
        search: '',

        editedIndex: -1,
        //Model
        id: "",
        name: "",
        description: "",
        createDate: "",
        modifyDate: "",
        userId:"",
        themeNumber:"",

        nameTitle: "",
        tokenDataTrue : "",
        img:"",
        refHtml: "",
        projectId: "",

        /*progress bar*/
        loading: false,
        cantTotalArr:0,
        /*return : {
            NamePage : pageViews[0].name + '.html'
        }*/
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
		if(item.name!=null){
                	return item.name.toLowerCase().includes(this.search.toLowerCase());
		}
            });
        }
    },
    
    watch: {
        dialog(val) {
            val || this.close();
        },
        loading (val) {
            if (!val) return
    
            setTimeout(() => (this.loading = false), (this.cantTotalArr-1)*2000)
          },
    },
    created() {
        this.listar();
    },

    mounted(){
        document.title = "Wire2Web - Vistas"
    },
    methods: {
         UpdatePrincipal(obj){

            let me =this;
            if (localStorage.getItem("tokenDataTrue") != null) {
                
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }

            axios 
            .post("api/PageView/updatePrincipal", {
                idPageView: obj.id,
                idProject:obj.projectId,
            }, { headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }})
            .then(function(response) {
                if(response.data == true){
                    var lastPrincipal = me.pageViews.filter((item) => {
                        return (item.isPrincipal && item.id != obj.id);
                    });
                    if (lastPrincipal.length > 0) 
                        lastPrincipal[0].isPrincipal=false;
                    
                    me.pageViews = [];
                    me.listar();

                }
                
            })
            .catch(function(error) {
            });
            

        },
     


        download(filename, content) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:zip/plain;charset=utf-8,' + encodeURIComponent(content));
            
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
        downloadProjectZip() {
            let me = this;
            var haveIData = false; 
            if (localStorage.getItem("tokenDataTrue") != null) {
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            } 
            axios.get("api/Project/" + me.PageViewId, { headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }})
            .then(function(response){
                    
                    me.themeNumber = response.data.themeNumber;
                    
                    me.id = response.data.id;
                    me.name = response.data.name;
                    me.description = response.data.description;
                    me.createDate = response.data.createDate;
                    me.modifyDate = response.data.modifyDate;
                    me.userId = response.data.userId;
                    
                    haveIData = true;
                    
                    
                    if (haveIData == true){
                        //alert("Esto puede tomar unos segundos, se están descargando los archivos");
                    
                    var zip = new JsZip();
                    /*
                    Execute:
                    npm i file-saver
                    npm i jszip-utils
                    */
                    //me.globaldelcolor = parseInt(JSON.parse(localStorage.getItem("themeGlobalVariable")));
                    var urls = [];
                    var namesFiles = [];
                    var count = 0
                    var htmlFiles = [];
                    me.pageViews.forEach(function(pageview, index){
                        if(pageview.htmlUrl!=null && pageview.htmlUrl!="") {
                            urls.push(pageview.htmlUrl);
                            namesFiles.push(pageview.name + ".html");
        
                           
                        }
                    })
        
                    /** AGREGAMOS EL URL LOCAL AL URLS*/
                    //var prePath = "http://localhost:8080/resources/theme/"; //will change
                    
                    var path = window.location.origin;
                    var prePath = path + '/resources/theme/';
                    var postPath = "";
                    switch (me.themeNumber){
                        case 0 :
                                me.cssFileName ="bootstrap.css";
                                me.validadorCss = true;
                                break;
                        case 1 :
                                me.cssFileName ="bootstrap-blue.min.css";
                                me.validadorCss = true;
                                break;
                        case 2 :
                                me.cssFileName ="bootstrap-dark.min.css";
                                me.validadorCss = true;
                                break;
                        case 3 : 
                                me.cssFileName ="bootstrap-grey.min.css";
                                me.validadorCss = true;
                                break;
                        case 4 :
                                me.cssFileName ="bootstrap-pink.min.css";
                                me.validadorCss = true;
                                break;
                        case 5 :
                                me.cssFileName ="bootstrap-purpure.min.css";
                                me.validadorCss = true;
                                break; 
                        case 6 :
                                 me.cssFileName ="bootstrap-solar.min.css";
                                me.validadorCss = true;
                                break;
                    }
        
                    var totalPath = prePath + me.cssFileName;
                    if (me.themeNumber > -1){
                        urls.splice(0,0,totalPath);
                        //urls.push(totalPath);
                        //urls.push("https://wire2web.blob.core.windows.net/files/3003/4097/html/Prueba_505.html");
                        namesFiles.splice(0,0,me.cssFileName);
                        //namesFiles.push(me.cssFileName);
                        //namesFiles.push("Prueba_506.html");
                    }
                    me.cantTotalArr = urls.length;
                    me.loading = true;
                    /** */
                    //Se hace el axios.get, y se guarda en una nueva lista que contendrá el cod html, ahí se modifica
                    
                    urls.forEach(function(url, cont){
                        
                        setTimeout(() => {
                            axios.get(url)
                        .then(function(response){
                            /**************
                                     * 
                                     * PONER EL CÓDIGO QUE QUITA EL LINK, Y PONER EL STYLE DE CSS BAJADO
                                     * 
                                     * 
                                     * ********* */
                            var ocurrenciasIndex = [];
                            var position = 0;
                            var cd = response.data.split("border: 1px solid red;").join(""); //magic :D
                            var code = cd ;
                            
                            function contarOcurrencias (cadena, subcadena){
                                while((position = cadena.indexOf(subcadena, position)) !== -1){
                                    var word = "";
                                    for (var u = position + 6 ; u < position + 10; u++){
                                        word += cadena[u];
                                    }
                                                                
                                    if (word != "<lin")
                                        ocurrenciasIndex.push(position);
                                    position += subcadena.length;
                                }
                                                            
                            }
                                    
                            contarOcurrencias(code, "<lin");
                            var contador = 0;
                            var finalUrl = "";
                            var arrFinalUrl = [];
                            ocurrenciasIndex.forEach(function(valor, index){
                                var fa = code.substring(contador, valor );
                                var fmid = '<link rel="stylesheet" type="text/css" href="' + me.cssFileName+ '">  ';
                                var fm = code.substring(valor + 211);
                                finalUrl = fa + " " + fmid + " " + fm;
                                })
                            if(ocurrenciasIndex.length == 0){
                                finalUrl = code;
                            }


                            /******************************************/
                            htmlFiles.push(finalUrl);
                            //Hasta acá tenemos el cod agregado
        
                            if (urls.length == htmlFiles.length){
                                htmlFiles.forEach(function(newcode, index){
                                    //acá le quitamos la parte del link, y hacemos referencia al archivo local
                                    var code2 = newcode;
                                    
                                                                  
                                    try{
                                        //Esto hace el guardado
                                        var f = new File([code2], "filename.html");
                                        zip.file(namesFiles[index] , f, {binary:true});
        
                                        if (index == urls.length-1) {
                                            zip.generateAsync({ type: "blob" }).then(function (content) {
                                                FileSaver.saveAs(content, me.name + ".zip");
                                            });
                                        }
                                    }
                                    catch (e){
                                    }
                                })
        
        
                                /**/
                            }
                        })
                        .catch(function (error) {
                        });
                        }, cont * 2000)
                    })
                    }
                }
            )
            .catch(function (error) {
                if (error.response.status == 401){
                    alert("Necesita autenticarse!!")
                    window.location = '/login';
                    
                }
            })
            .finally(() =>{
            });

            
            
            
        },
        backToProjects(){
            window.location = "/project"
          },
        listar() {
            let me = this;
            var endpoint = "api/PageView";
            //var ProjectIdResulter = 0;
           
            //validate

            if (localStorage.getItem("tokenDataTrue") != null) {
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");

            }

            axios.get("api/Project/" + me.PageViewId, { headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }})
            .then(function(response){
                me.themeNumber = response.data.themeNumber;
                me.id = response.data.id;
                me.name = response.data.name;
                me.description = response.data.description;
                me.createDate = response.data.createDate;
                me.modifyDate = response.data.modifyDate;
                me.userId = response.data.userId;
                me.nameTitle =  me.name
                axios.get("api/PageView/project/" + me.PageViewId, {
                     headers:{
                        Authorization : 'Bearer ' + me.tokenDataTrue
                     }
                })
                .then(function (response) {
                    
                    me.pageviews2 = response.data;
                    if (me.pageviews2.length ==  1 ){
                        var element = me.pageviews2[0];
                        if(!element.isPrincipal  ){
                            me.UpdatePrincipal(element);
                        }
                    }
                    me.pageviews2.forEach(function(pv, index){
                        if (pv.isPrincipal == true){
                            me.pageViews.splice(0,0, pv);
                        }
                        else{
                            me.pageViews.push(pv);
                        }
                    })
                    //ACÁ YA ESTÁ ORDENADO :3
                    //localStorage.setItem("ProjectIdPreview", me.PageViewId);

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
                    window.location = '/login'; */
                    
                }
            });
            
        },
       
        Delete(item) {
            let me = this;
            me.$swal.fire({
                title: '¿Estas seguro de eliminar esta Vista?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar'
              }).then((result) => {
                if (result.isConfirmed) {
                    if (localStorage.getItem("tokenDataTrue") != null) {
                        me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
                    }
                    axios
                        .delete("api/PageView/" + item, { headers: {
                            Authorization : 'Bearer ' + me.tokenDataTrue
                        }})
                        .then(function (response) {
                            me.pageViews = [];
                            me.listar();
                        })
                        .catch(function (error) {
                            me.$swal.fire({
                                icon: 'warning',
                                title: 'Hubo un error al eliminar la vista',
                                showConfirmButton: false, 
                                 timer: 2000 
                              })
                           /*  alert("Hubo un error al eliminar la vista"); */
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
                }
              })
        },
       
        close() {
            let me = this;
            this.createDialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            me.listar();
            me.limpiar();
        },
      
        limpiar() {
            this.userId = "";
            this.name = "";
            this.description = "";
            //this.createDate = '';
            //this.modifyDate = '';
        },
        cerrarSesion() {
            if (localStorage.getItem("tokenDataTrue") != null) {
                localStorage.removeItem("tokenDataTrue");
            }
            window.location.href = "/";
        },

        wireframeCardStyles(wireframe){
            return {
                backgroundImage: `url(${wireframe.imgUrl}) `,
                backgroundPosition: 'center center',
                backgroundSize: 'cover'
            }
        }
    },


};