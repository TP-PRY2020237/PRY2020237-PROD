import axios from "axios";
import UserModel from "@/Entities/User.js";
export default {

    mounted() {
        let me = this;
        if (localStorage.getItem("tokenDataTrue") != null) {
            me.tokenDataTrue = localStorage.getItem("tokenDataTrue");               
            axios.get("api/User/user/"+ 1, { headers: {
                Authorization : 'Bearer ' + me.tokenDataTrue
            }})
            .then(function(response){
                var userId = response.data.id;
                var fName =response.data.firstName;
                var lName =response.data.lastName
                var mail = response.data.email;
                var pass = response.data.password;
                me.id = userId;
                me.firstName = fName;
                me.lastName = lName;
                me.email = mail;
                me.password = pass;
                me.user = new UserModel(me.id, me.firstName, me.lastName, me.email, me.password, "", "");
                
            }).catch(function (error) {
                if (error.response.status == 401){
                    //alert("Necesita autenticarse!!")
                    //window.location = '/login';
                    
                }
            });
        }
    },
    props: {
        source: String,
    },

    data: () => ({
        user: new UserModel('', '', '', '', '', '', ''),
        users: [],
        nombreperfil:"",
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        tokenDataTrue:"",
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
        reg: false,
        dialog: false,
        dialoglogin: false,
        drawer: null,
        valid: true,
        nameRules: [(v) => !!v || "El nombre es requerido"],
        lastnameRules: [(v) => !!v || "El apellido es requerido"],
        passwordRules: [(v) => !!v || "La contraseña es requerida",
            v => (v && v.length >= 5) || 'La contraseña debe tener más de 5 caracteres',
            v => /(?=.*[A-Z])/.test(v) || 'Debe tener un carácter en mayúscula',
            v => /(?=.*\d)/.test(v) || 'Debe tener un numero',
        ],
        emailRules: [
            (v) => !!v || "El e-mail es requerido",
            (v) => /.+@.+\..+/.test(v) || "Ingrese un e-mail con el formato correcto",
        ],
    }),
    created() {
        this.listar();
    },
    methods: {
       
        login() {
            axios
                .put("api/User")
                .then(function (response) {
                    var email_value = document.getElementById("email").value;
                    var pass_value = document.getElementById("password").value;
                    var _flat = false;
                    for (var i in response.data) {
                       
                     
                        if (
                            email_value == response.data[i]["email"] &&
                            pass_value == response.data[i]["password"]
                        ) {
                            _flat = true;
                            window.location.href = "/project";
                        }
                    }
                    if (!_flat)
                    me.$swal.fire({
                        icon: 'warning',
                        title: 'Usuario Incorrecto',
                        showConfirmButton: false, 
                         timer: 2000 
                      })
                   /*  alert("Usuario Incorrecto"); */
                    //me.user = response.data;
                })
                .catch(function (error) {
                });
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        save() {
            //this.$refs.form.save();
            let me = this;
            if (localStorage.getItem("tokenDataTrue") != null) {
                me.tokenDataTrue = localStorage.getItem("tokenDataTrue");
            }
            axios
                .put("api/User/user/UpdateTrue", {
                    //id: 1,
                    firstName: me.firstName,
                    lastName: me.lastName,
                    //email: me.email, //COMENTARLO
                    //password: me.password, //COMENTARLO
                    token: "",
                    tokenLogin: me.tokenDataTrue,
                }, { headers: {
                    Authorization : 'Bearer ' + me.tokenDataTrue
                }})
                .then(function (response) {
                    if (response.data == true && response.status == 200){
                        me.close();
                        me.limpiar();
                        var json = JSON.stringify(me.user);
                        me.$swal.fire({
                            icon: 'success',
                            title: 'Sus datos fueron actualizados satisfactoriamente',
                            confirmButtonText: 'OK'
                        
                        }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                                window.location.href = "/perfil";
                        } 
                        })
                    }
                    //Se agregó este if para validar el true
                    else if(response.data == false ){
                        me.close();
                        //me.limpiar();
                        var json = JSON.stringify(me.user);
                        me.$swal.fire({
                            icon: 'error',
                            title: 'Sus datos no fueron actualizados',
                            confirmButtonText: 'OK'
                        
                        })
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
                       /*  alert("Necesita autenticarse!!")
                        window.location = '/login'; */
                        
                    }
                });
        },
        limpiar() {
            this.$refs.form.reset();
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
            this.token = "";
        },
        cerrarSesion() {
            if (localStorage.getItem("sesion") != null) {
                localStorage.removeItem("sesion");
            }
            window.location.href = "/";
        },
    },
};