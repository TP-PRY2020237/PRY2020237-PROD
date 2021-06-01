import axios from "axios";
export default {
    data: () => ({
        valid: true,
        password: "",
        passwordRules: [(v) => !!v || "La contraseña es requerida"],
        email: "",
        emailRules: [
            (v) => !!v || "El e-mail es requerido",
            (v) => /.+@.+\..+/.test(v) || "Ingrese un email con el formato correcto",
        ],
    }),

    methods: {
        RecoverMethod() {
            let me = this;
            this.$refs.form.validate();
            var email_value = document.getElementById("email").value;
            var originalPath = window.location.origin;
            var tokenDataTrue = "";
            if (email_value == "") {
                return false;
            }
            if (localStorage.getItem("sesion") != null) {
                let tokenData = JSON.parse(localStorage.getItem("sesion"))["token"];
                
                tokenDataTrue = tokenData
            }
            axios
                .post("api/Mail/recover/password", {
                    Email: email_value,
                    path : originalPath,
                }, { headers: {
                    Authorization : 'Bearer ' + tokenDataTrue
                }})
                .then(function (response) {
                    if (response.data == true && response.status == 200) {
                         me.$swal.fire({
                            title: 'Se le envío un enlace de recuperación de contraseña a su correo electrónico',
                            text: "",
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/"; 
                            }
                      })
                        /*  alert("Se le envío un enlace de recuperación de contraseña a su correo electrónico");*/
                        //window.location.href = "/";  
                    } else if( response.data == false)
                    {
                        me.$swal.fire({
                            icon: 'warning',
                            title: 'Ingrese un correo existente',
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                    }
                    else {
                        me.$swal.fire({
                            icon: 'warning',
                            title: 'Hubo un error intentelo nuevamente',
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                       /*  alert("Hubo un error intentelo nuevamente"); */
                    }
                })
                .catch(function (error) {
                    //alert("No hay servicio. Intente nuevamente en unos segundos.");
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
    },
};