import axios from "axios";

export default {
    name: 'Form-New-Password-Component',
    data: function () {
        return {
            token: this.$route.query.token,
            passwordRules: [(v) => !!v || "La contraseña es requerida",
                v => (v && v.length >= 5) || 'La contraseña debe tener más de 5 caracteres',
                v => /(?=.*[A-Z])/.test(v) || 'Debe tener un carácter en mayúscula',
                v => /(?=.*\d)/.test(v) || 'Debe tener un numero',
            ],
            valid: true,
            user: {
                password: "",
            }
        }
    },
    mounted(){
        let me  = this;
        var beforeToken = window.location.search;
        var actualToken = beforeToken.substring(7);
        axios.post("api/User/validate/token",{
            token : actualToken,
        }).then(function (response){
            if (response.data == false){
                me.$swal.fire({
                    icon: 'warning',
                    title: 'El link ingresado ya expiró',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/login";
                    }
              })
            }
        })

    },
    methods: {
        
        save() {
            let me = this;
            let user = this.user;
            var tokenDataTrue = "";
            if (localStorage.getItem("sesion") != null) {
                let tokenData = JSON.parse(localStorage.getItem("sesion"))["token"];
                
                tokenDataTrue = tokenData
            }
            axios
                .post("api/User/update/password", {
                    password: user.password,
                    token: this.token,
                }, { headers: {
                    Authorization : 'Bearer ' + tokenDataTrue
                }})
                .then(function (response) {
                   
                    if(response.status==200 && response.data == true){
                        
                        me.$swal.fire({
                            title: 'Su contraseña fue actualizada satisfactoriamente',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/login";
                            }
                      })
                        
                        
                       /*  alert("Su contraseña fue actualizada satisfactoriamente");
                        window.location.href = "/login"; */
                    }
                    else{
                        me.$swal.fire({
                            icon: 'warning',
                            title: 'Usted no se encuentra autorizado para realizar esta operación',
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                       /*  alert("Usted no se encuentra autorizado para realizar esta operación"); */
                    }
                })
                .catch(function (error) {
                    me.$swal.fire({
                        icon: 'warning',
                        title: 'Hubo un error, intentelo mas tard',
                        showConfirmButton: false, 
                         timer: 2000 
                      })
                  
                    
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
}
