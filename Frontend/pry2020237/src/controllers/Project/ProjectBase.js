import axios from "axios";
import UserOptionsComponent from "@/views/Share/UserOptionsComponent";
import Vue from "vue";

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
}
  

export default {
    components: {UserOptionsComponent},
    data: () => ({
        drawer: true,
        projects: [],
        dialog: false,
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
        valid : true,
        editedIndex: -1,
        dialog : false,
        //ModelUserToken
        userId : 0,
        email : "",
        tokenDataTrue : "", //tokenLogin, para no cambiar nomenclaturas dentro del front

        //Model Project
        id: "",
        name: "",
        description: "",
        createDate: "",
        modifyDate: "",
        themeNumber:0,
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nuevo Proyecto" : "Actualizar Proyecto";
        },
        filteredProjects: function () {

            if (this.search == null) {
                this.search = "";
            }
            return this.projects.filter((item) => {
		if(item.name!=null){
                	return item.name.toLowerCase().includes(this.search.toLowerCase());
		}
            });
        },
       
        
    },
    watch: {
        dialog(val) {
            
            val || this.close();
        },

    },
    created() {
        this.listar();
    },
    mounted(){
        document.title = "Wire2Web - Proyectos"
    },
    methods: {
     
        listar() {
            
            let me = this;
            var endpoint = "api/Project";
            if (localStorage.getItem("usuario") != null) {
                me.email = localStorage.getItem("usuario");
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            

            axios.get("api/User/user/email/" + me.email)
            .then(function(response	){
                me.userId = response.data.id;
                me.token = response.data.token;
                me.tokenDataTrue = response.data.tokenLogin;
                endpoint = "api/Project/user/" ;
                axios
                .get(endpoint, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function (response) {
                    
                    
                    me.projects = response.data;
                    
                
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
            .catch(function(error){
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
            })

            
        },
        editItem(item) {
            
            this.id = item.id;
            this.name = item.name;
            this.description = item.description;
            this.createDate = item.createDate;
            this.modifyDate = item.modifyDate;
            this.userId = item.userId;
            this.themeNumber = item.themeNumber;
            this.editedIndex = 1;
            this.dialog = true;

            
            

        },
        
        deleteItem(item) {
            const index = this.desserts.indexOf(item);
            confirm("Are you sure you want to delete this item?") &&
                this.desserts.splice(index, 1);
        },
        Delete(item) {
            let me = this;
            me.$swal.fire({
                title: '¿Estas seguro de eliminar este Proyecto?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar'
              }).then((result) => {
                if (result.isConfirmed) {
                    let me = this;
                    
                    axios
                        .delete("api/Project/" + item, { headers: {
                            Authorization : 'Bearer ' + me.tokenDataTrue
                        }})
                        .then(function (response) {
                            
                            me.listar();
                        })
                        .catch(function (error) {
                            me.$swal.fire({
                                title: 'Hubo un error al eliminar un Proyecto',
                                icon: 'warning',
                                showConfirmButton: false, 
                                timer: 2000 
                              })
                           // alert("Hubo un error al eliminar un Proyecto");
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
                }
              })
            
 
        },
        openPopUp(){
            this.dialog = true;
            this.$refs.form.reset();
        },
        close() {
            
            let me = this;
            //this.createDialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                
            });
            this.dialog = false;
            me.listar();
            me.limpiar();
        },
        /*  close() {
          this.dialog = false;
        }, */
        save() {
            //Debemos hacer la validación antes que nada :D!
            this.$refs.form.validate();
            let me = this;
            if (me.name == "") {
                return false;
            }
            
            
            var tmpDate = new Date();
            //tmpDate.setHours(tmpDate.getHours() - 4);
            if (this.editedIndex == -1 ){ //save
                
                axios
                .post("api/Project", {
                    
                    userId: me.userId,
                    name: me.name,
                    description: me.description,
                    createDate: "2020-09-26",
                    modifyDate: tmpDate,
                }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function (response) {
                   
                    me.close();
                    if (response.data == true && response.status == 200)
                    {
                        me.$swal.fire({
                            icon: 'success',
                            title: 'Se creo el proyecto satisfactoriamente',
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                    } else if(response.data == false ){
                        //if (me.name == "") 
                        me.$swal.fire({
                            title: 'El nombre de proyecto ya existe',
                            icon: 'warning',
                            showConfirmButton: false, 
                            timer: 2000 
                          })
                      //  alert("El nombre de proyecto ya existe");
                    }
                    
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
            }
            else if(this.editedIndex == 1 ){ //update
                this.name = me.name;
                this.description = me.description;
                axios
                .put("api/Project", {
                    
                    userId: me.userId,
                    name: this.name,
                    description: this.description,
                    createDate: "2020-09-26",
                    modifyDate: tmpDate,
                    id:me.id,
                    themeNumber : me.themeNumber,

                }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function (response) {
                    me.close();
                    me.$swal.fire({
                        icon: 'success',
                        title: 'Se modificó el proyecto satisfactoriamente',
                        showConfirmButton: false, 
                         timer: 2000 
                      })
                   // alert("Se modificó el proyecto satisfactoriamente");
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
                       /*  alert("Necesita autenticarse!!")
                        window.location = '/login'; */
                        
                    }
                });
            }
            
            
            
        },
        limpiar() {
            this.userId = "";
            this.name = "";
            this.description = "";
        },
        cerrarSesion() {
            if (localStorage.getItem("sesion") != null) {
                localStorage.removeItem("sesion");
            }
            window.location.href = "/";
        },

        parseLastUpdatedDate(date){
            return date.split('T')[0]
        },
    },
};