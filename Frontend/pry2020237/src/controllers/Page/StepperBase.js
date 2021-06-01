import axios from "axios";
import PageView from "../../views/Page/PageView.vue";
import UserModel from "@/Entities/User";
import { RowsController } from "../../utils/EditPageEntities/RowsController";
import { Tree } from "../../utils/EditPageEntities/Tree";
import RenderHTMLSection from "@/views/Page/RenderHTMLSection";
import { LocalizationES } from '@/Entities/LocalizationES'


  export default {
    props: {
      pageViewId:{
        type: String,
      },
    },
    components: {
        RenderHTMLSection,
    },
    data () {
      return {
          step1IsValid: true,
          step1ErrorMsg: null,
          id: "",
          name: "",
          nameRules: [(v) => !!v || "El nombre es requerido",
          v => (v && v.length <= 15) || 'El nombre del proyecto debe contener máximo 15 caracteres',
          v => (v || '').indexOf(' ') < 0 || 'No se permiten espacios',
        ],
          description: "",
          createDate: "",
          modifyDate: "",
          img:"",
          refHtml: "",
          projectId: "",
          currentStepper: 1,
          imageURLPreview:null,
        imageName:'',
        w:0,
        l:0,
        v:1.0,
        resultPrediction:[],
        resultPredictionJson:"",
        percent: 0, //**********************
        totalArray:[], //**********************
        slider:30,
        base64text:"",
        imageFile:null,
        message4:"",
        imageUrl:'',
        image:null,
        tokenDataTrue:"",
        avatar:null,
        ResponseNewPageView:{
          id:0
        },
        componentSelected:{},
        rowController:RowsController,
        tree:Tree,
        pageViewModel:{},
        loadingBuildTree:false
      }
    },
    computed:{
        formIsValid (){
              return this.imageUrl !== ''
        },
      
    },
      updated(){
          if(this.currentStepper==3) {
          }
      },
      mounted(){
        document.title = "Wire2Web - Crear wireframe"
    },
    methods:{
        rig(){
            //window.location = "/pageView/" + this.pageViewId;
            window.location.replace('/pageView/' + this.pageViewId); //magic 2
        },
        turned(value){ //**********************
            //el 0.3 me va a indicar hasta donde muestro en el slider 100 = 0.0 y 0 = 100.0
            let me = this;
            me.resultPrediction = []
            me.percent = ((value))/100;
           
            me.slider=value;
            me.currentStepper = 3; //Pasar al paso 3
            var array = [];
            array = me.totalArray; //Asignar la respuesta del custom vision
            var resultArray=[];
            array.forEach(element => {
                if(parseFloat(element.probability)< parseFloat(me.percent)) //el 0.3 me va a indicar hasta donde muestro en el slider 100 = 0.0 y 0 = 100.0
                
                {return;}
                
                resultArray.push(element);
            });
            me.resultPrediction = resultArray; //Asignar la respuesta el resultado filtrado
            me.resultPredictionJson = JSON.stringify(resultArray);
        },
        nextStep(n){
            if(this.currentStepper == 1){

                /*acá el validador*/
                let me = this
                if (me.name == "") {
                    return false;
                }
                if (localStorage.getItem("tokenDataTrue") != null) {
                    me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
                }
                var isValid = this.$refs.form.validate();
                var result = isValid && (me.imageURLPreview!=null)
                me.step1IsValid = result;
                //acá consumir el api :D verificar si es bool
                axios.post("api/PageView/check", {
                    idProject: parseInt(me.pageViewId),
                    nName: me.name,
                }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }}).then(function(response){
                    
                    if(response.data == true)
                    {
                        
                        
                        if(result){
                            me.currentStepper = n;
                            me.requestToCustomVision();
                        }
                        else{
                            return;
                        }
                    
                        
                    }
                    else{
                        me.$swal.fire({
                            title: 'El nombre del proyecto ya existe',
                            icon: 'warning',
                            showConfirmButton: false, 
                            timer: 2000 
                          })
                        //alert("El nombre del proyecto ya existe");
                    }

                })
                
            } else if (this.currentStepper === 3){
                this.currentStepper = n;
              
            }
        },
        onFilePicked(e) { //acá se ve el lenght
            let me = this;
            const files = e.target.files
            
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            //alert(reader);
            reader.onload = event =>{
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                   /* me.w = img.width;
                    me.l = img.height;
                    // Vertical 560=l - 396=w
                    //Horizontal 593=l - 800=w
                    //Square 550=l=w

                    if (me.w > me.l){
                        if (me.l +50 >= me.w)
                        {
                            me.w = 550;
                            me.l = 550;
                        }
                        else {
                            me.w = 800;
                            me.l = 593;
                        }
                        
                    }
                    else {
                        if (me.w + 50 >= me.l ){
                            me.w = 550;
                            me.l = 550;
                        }
                        else {
                            me.l = 560;
                            me.w = 396;
                        }
                        
                    }*/
                    //alert(me.w + " x " + me.l);
                }
            }

            if (files[0] !== undefined) {
                this.imageName = files[0].name
                //alert(this.imageName);
                if (this.imageName.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener('load', () => {
                    this.base64text = fr.result
                    this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                    this.imageURLPreview =URL.createObjectURL(files[0]);
                })
            } else {
                this.imageName = ''
                this.imageFile = ''
                this.imageUrl = ''
            }
        },
        requestToCustomVision(){
            let me = this;
            let code = me.base64text.slice(23);
            if (localStorage.getItem("tokenDataTrue") != null) {
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            axios
                .post("api/CustomVision/FindComponents", {
                    filePath : "string",
                    fileName: "string",
                    fileContent : code
                }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function (response) {
                    //alert(response.data);
                    //PASO 2
                    var ErrorMessage = response.data['status'];
                    if (ErrorMessage!=null)
                    {
                        me.imageURLPreview = null;
                        me.resultPrediction = [];
                        me.$swal.fire({
                            title: 'No se encontró ningún componente en la imagen, intente con otra imagen',
                            icon: 'warning',
                            showConfirmButton: false, 
                            timer: 2500 
                          })
                        /* alert("No se encontró ningún componente en la imagen, intente con otra imagen"); */
                        me.currentStepper = 1;
                        return;
                    }
                    
            
                    me.currentStepper = 3; //Pasar al paso 3
                    
                    var array = [];
                    array = response.data['predictions']; //Asignar la respuesta del custom vision
                    me.totalArray = array;
                    var resultArray=[];
                    array.forEach(element => {
                        if(parseFloat(element.probability)<0.30) //el 0.3 me va a indicar hasta donde muestro en el slider 100 = 0.0 y 0 = 100.0
                        {return;}
                        resultArray.push(element);
                    });
                    if (resultArray.length == 0){
                        me.$swal.fire({
                            title: 'No se encontró ningún componente en la imagen, intente con otra imagen',
                            icon: 'warning',
                            showConfirmButton: false, 
                            timer: 2500 
                          })
                        /* alert("No se encontró ningún componente en la imagen, intente con otra imagen"); */
                        me.currentStepper = 1;
                        resultArray = [];
                        return;
                    }
                    me.resultPrediction = resultArray; //Asignar la respuesta el resultado filtrado
                    
                    me.resultPredictionJson = JSON.stringify(resultArray);
                })
                .catch(function (error) {
                    me.$swal.fire({
                        title: 'No hay servicio disponible intentelo mas tarde',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                      })
                   /*  alert("No hay servicio disponible intentelo mas tarde"); */
                    me.currentStepper = 1;
                })
                .finally(function(){
                    
                    me.w = parseInt(document.getElementById('findWidth').clientWidth);
                    me.l = parseInt(document.getElementById('findWidth').clientHeight);
                    //alert("-----"  + me.w + "x" + me.l);
                });
        },
        async CreateComponents(pageViewId){
            let me = this;
            var componentsType=[];
            
            //PASO 4
            if (localStorage.getItem("tokenDataTrue") != null) {
                //let userId = JSON.parse(localStorage.getItem("sesion"))['id'];
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            await axios
                .get("api/ComponentType", { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function (response) {
                    componentsType = response.data;
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
                      
                        
                    }
                }).finally(async function () {
                    
                    
                    for(const index in me.resultPrediction) {
                        var componentType = {
                            id:"",
                            atributesJson:"",
                            name:"",
                            tagId:""
                        }
                        componentType = componentsType.find(obj => {
                            return obj.tagId === me.resultPrediction[index].tagId
                        });
                        var modifyJson = JSON.parse(componentType.atributesJson.toString());
                        modifyJson.boundingBox = me.resultPrediction[index].boundingBox;
                        var jsonAsString = JSON.stringify(modifyJson);
                        await axios.post("api/Component", {
                            attributesJson: jsonAsString,
                            componentTypeId: parseInt(componentType.id),
                            pageViewId: parseInt(pageViewId),
                        }, { headers: {
                            Authorization : 'Bearer ' + me.tokenDataTrue
                        }})
                            .then(function (response) {
                            })
                            .catch(function (error) {
                                if (error.response.status == 401){
                                   /*  alert("Necesita autenticarse!!")
                                    window.location = '/login'; */
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
                                    
                                }
                            });
                    }
                }
            );
        },

        UploadImageToBlobStorage(token){
            let me = this;
            var fileName = [
                String(me.pageViewId),
                'image',
                String(me.name)
            ].join('/');
            let content = me.base64text.slice(23);

            return axios.post("blobs/uploadimage",
                { content: content, fileName: fileName, },
                { headers: { Authorization : 'Bearer ' + token }}
            );
        },
        saveImage() {
            let me = this;
            if (me.name == "") {
                return false;
            }
            me.loadingBuildTree = true
            if (localStorage.getItem("tokenDataTrue") != null) {
                //let userId = JSON.parse(localStorage.getItem("sesion"))['id'];
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            
            
            var uploadImageRequest = me.UploadImageToBlobStorage(me.tokenDataTrue);
            uploadImageRequest.then(imageUrl => {
            let jsonBodyForRequest = []
            axios.post("api/PageView", {
                    name: me.name,
                    description: me.description,
                    createDate: new Date(),
                    modifyDate: new Date(),
                    imgUrl: String(imageUrl.data),
                    componentDetectedJson : me.resultPredictionJson.toString(),
                    htmlUrl:"",
                    projectId: parseInt(me.pageViewId),
                }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(async function (response) {
                    me.ResponseNewPageView = response.data;
                    
                    await me.CreateComponents(me.ResponseNewPageView.id).then(async () =>{
                        await me.getComponentsByView(response.data.id).then(async (res) => {
                            jsonBodyForRequest =  res;
                            await me.setComponentType(jsonBodyForRequest).then(async () => {
                                me.rowController    = new RowsController(jsonBodyForRequest)
                                me.tree             = new Tree(me.rowController.rows)
                                await me.sendTreeToPageViewAPI().then(() => {
                                    
                                    me.loadingBuildTree = false
                                    me.nextStep(4)
                                })
                            })

                        })    
                    });
                    
                })
                .catch(function (error) {
                    if (error.response.status == 401){
                       /*  alert("Necesita autenticarse!!")
                        window.location = '/login'; */
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
                        
                    }
                });

            });
        },

        async getComponentsByView(id){
            let me = this;
            
            if (localStorage.getItem("tokenDataTrue") != null) {
                //let userId = JSON.parse(localStorage.getItem("sesion"))['id'];
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            return await axios.get(`api/Component/pageview/${id}`,{ headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }}).then(res => res.data)
        },

        async setComponentType(components) {

            let me = this;
            var componentsType = [];

            if (localStorage.getItem("tokenDataTrue") != null) {
                //let userId = JSON.parse(localStorage.getItem("sesion"))['id'];
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            
            await axios.get("api/ComponentType", { headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }})
            .then(function (response) {
                componentsType = response.data;
                
                for (const index in components) {
                    components[index].attributesJson = JSON.parse(components[index].attributesJson.toString());
                    var componentType = {
                        id: "",
                        atributesJson: "",
                        name: "",
                        tagId: ""
                    }
                    componentType = componentsType.find(obj => {
                        return obj.id === components[index].componentTypeId
                    });

                    components[index].componentType = componentType;
                }
                components.sort(function(itemA, itemB) {
                    let result1 = itemA.componentType.name;
                    let result2 = itemB.componentType.name;

                    const primeraPalabra = LocalizationES[result1.replace(/\s+/g, '')];
                    const segundaPalabra = LocalizationES[result2.replace(/\s+/g, '')];

                    if (primeraPalabra > segundaPalabra) {
                        return 1;
                    }
                    if (primeraPalabra < segundaPalabra) {
                        return -1;
                    }
                    return 0;
                });
            })    
        },

        async sendTreeToPageViewAPI(){
            let me = this;
            let tempPageView =  this.ResponseNewPageView
            tempPageView.jsonTree =  JSON.stringify(this.tree)
            if (localStorage.getItem("tokenDataTrue") != null) {
                //let userId = JSON.parse(localStorage.getItem("sesion"))['id'];
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            await axios.put('api/PageView',tempPageView, {headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }})
        },



        GoToStep(n){
            this.currentStepper = 1;
        },

        setHTMLUrl(htmlURl){
            let me = this;
            if (localStorage.getItem("tokenDataTrue") != null) {
                //let userId = JSON.parse(localStorage.getItem("sesion"))['id'];
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            return axios.put("api/PageView/UpdateHTMLRoute", {
                id: parseInt(me.ResponseNewPageView.id),
                htmlUrl: htmlURl,
            }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }});
        },

        goToProjects(){
            let me = this;
            var hmlUrl = me.almacenarHtmlBlob();
            hmlUrl.then(function (response) {
                var UpdateHTML = me.setHTMLUrl(response.data);
                UpdateHTML.then(function (response) {
                    me.$swal.fire({
                        icon: 'success',
                        title: 'Se creo la vista satisfactoriamente',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            //window.location.href = "/pageView/" + me.pageViewId;
                            window.location.replace("/pageView/" + me.pageViewId);
                        }
                    });
                }).catch(function (error) {
                    me.$swal.fire({
                        icon: 'warning',
                        title: 'Hubo un error al guardar, intentelo nuevamente',
                        showConfirmButton: false, 
                         timer: 2000 
                      })
                   /*  alert("Hubo un error al guardar, intentelo nuevamente"); */
                })
            }).catch(function (error) {
                me.$swal.fire({
                    icon: 'warning',
                    title: 'Hubo un error al guardar, intentelo nuevamente',
                    showConfirmButton: false, 
                     timer: 2000 
                  })
                /* alert("Hubo un error al guardar, intentelo nuevamente"); */
            });
        },

        getHTMLContent(){
            var content = document.getElementById("RenderHTMLSection");
            var contentJson = {
                "value": "<!DOCTYPE html><html lang=\"en\"> <head> <meta name=\"viewport\" content=\"width=device-width\" /> <title>Wire2Web</title> <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css\" integrity=\"sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB\" crossorigin=\"anonymous\"> </head> <body> <div class=\"container body-content\"> <div id=\"container\" class=\"container\"> </div> </div> </body> </html>"
            }
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = contentJson.value;
            htmlObject.getElementsByClassName("container").item(0).innerHTML = content.innerHTML;
            return htmlObject;
        },

        almacenarHtmlBlob() {
            let me = this;
            var content = String(me.getHTMLContent().innerHTML);
            var fileName = [
                String(me.pageViewId),
                String(me.ResponseNewPageView.id),
                'html',
                String(me.ResponseNewPageView.name) + '.html'
            ].join('/');

            if (localStorage.getItem("tokenDataTrue") != null) {
                //let userId = JSON.parse(localStorage.getItem("sesion"))['id'];
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            return axios.post("blobs/uploadfile",
                { content: content, fileName: fileName, },
                { headers: { Authorization : 'Bearer ' + me.tokenDataTrue }}
                );
        },
    }
  }