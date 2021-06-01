import axios from "axios";
import UserModel from "@/Entities/User.js";
export default {

    mounted() {
        
    },
    props: {
        source: String,
    },

    data: () => ({
        drawer: true,
        user: new UserModel('', '', '', '', '', ''),
        users: [],
        nombreperfil:"",
        apellidoperfil:"",
        emailperfil:"",
        dialog: false,
        headers: [{
            text: "lastName",
            value: "lastName",
            sortable: false
        },
            {
                text: "firstName",
                value: "firstName",
                sortable: false
            },
        ],
        nameRules: [(v) => !!v || "El nombre del proyecto es requerido",
            v => (v && v.length <= 15) || 'El nombre del proyecto debe contener máximo 15 caracteres',
            v => (v || '').indexOf(' ') < 0 || 'No se permiten espacios',
        ],

        search: '',

        editedIndex: -1,
        tokenDataTrue: "",
        //Model
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        token: "",
    }),

    mounted(){
        document.title = "Wire2Web - Mi Perfil"
    },
    computed: {
       
        NameUser() {
            let objeto =this.users;
            this.nombreperfil=objeto[0]['firstName'];
            return this.nombreperfil;
          },
          LastNameUser() {
            let objeto =this.users;
            this.apellidoperfil=objeto[0]['lastName'];
            return this.apellidoperfil;
          },
          EmailUser() {
            let objeto =this.users;
            this.emailperfil=objeto[0]['email'];
            return this.emailperfil;
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

    methods: {
        listar() {
            let me = this;
            var endpoint = "api/User";
            var tokenDataTrue = "";
            if (localStorage.getItem("tokenDataTrue") != null) {
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            axios
                .get("api/User/user/" + 1, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function (response) {
              
                    me.user = new UserModel(JSON.parse(JSON.stringify(response.data)));
                    me.users.push(response.data);
                  
                    
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
                       /*  alert("Necesita autenticarse!!") */
                        //window.location = '/login';
                        
                    }
                });
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
        cerrarSesion() {
            if (localStorage.getItem("sesion") != null) {
                localStorage.removeItem("sesion");
            }
            window.location.href = "/";
        },
        goEditView() {
            let me = this;
            var json = JSON.stringify(me.user);
            $router.push()
        }

    },
};