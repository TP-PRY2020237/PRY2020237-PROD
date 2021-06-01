import axios from "axios";
export default {
    props: {
        source: String,
    },

    data: () => ({
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
    mounted(){
        document.title = "Wire2Web - Registro"
    },
    methods: {
        login() {
            
            let me = this;
            axios
                .get("api/User")
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
            this.$refs.form.validate();
            var tmpName = document.getElementById("firstname").value;
            var tmpLName = document.getElementById("lastname").value;
            var tmpEmail = document.getElementById("email").value;
            var tmpPAss = document.getElementById("password").value;

            if(tmpName.length > 0 && tmpLName.length > 0 && tmpEmail.length > 0 && tmpPAss){
                let me = this;
            axios
                .post("api/User", {
                    firstName: me.firstName,
                    lastName: me.lastName,
                    email: me.email,
                    password: me.password,
                    token: "",
                    tokenLogin:"",
                })
                .then(function (response) {
                    if(response.data == true){
                        me.close(); 
                        me.$swal.fire({
                            icon: 'success',
                            title: 'Sus credenciales fueron creadas satisfactoriamente',
                            confirmButtonText: 'OK'
                        
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.href = "/login";
                            } 
                        })

                        me.limpiar(); 
                    }
                    else{

                        me.$swal.fire({
                            icon: 'warning',
                            title: 'Esa cuenta de  usuario ya se encuentra en uso.',
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                    }
                    
                   /*  alert("Sus credenciales fueron creadas satisfactoriamente"); */
                   /* window.location.href = "/login";*/
                })
                .catch(function (error) {
                });
            }

            
        },
        limpiar() {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
            this.token = "";
        },
    },
};