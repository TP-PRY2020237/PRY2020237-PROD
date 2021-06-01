import axios from "axios";
export default {
    data: () => ({
        valid: true,
        password: "",
        passwordRules: [(v) => !!v || "La contraseña es requerida"],
        email: "",
        emailRules: [
            (v) => !!v || "El e-mail es requerido",
            (v) => /.+@.+\..+/.test(v) || "Ingrese un e-mail con el formato correcto",
        ],
    }),

    mounted(){
        document.title = "Wire2Web - Login"
    },
    methods: {
        validate() {
            let me = this;
            this.$refs.form.validate();
            var email_value = document.getElementById("email").value;
            var pass_value = document.getElementById("password").value;
            var st = 0;
            if (email_value == "" || pass_value == "") {
                return false;
            }
            
            axios
                .post("api/User/login", {
                    email: email_value,
                    password: pass_value,
                })
                .then(function (response) {
                    st = response.status ;
                    if (response.status == 200) {

                        var usuario = response.data;
                        var emailsuario = usuario.email;
                        localStorage.setItem("usuario", emailsuario);
                        localStorage.setItem("tokenDataTrue", usuario.tokenLogin);
                        //localStorage.setItem("sesion", JSON.stringify(response.data)); //Se comentaría
                        localStorage.setItem("dateNow", Date.now());
                        /*Hacemos el put de usuario*/
                        axios.put("api/User",{
                            id: usuario.id,
                            firstName: usuario.firstName,
                            lastName: usuario.lastName,
                            email: usuario.email,
                            password: usuario.password,
                            token: "",
                            tokenLogin : usuario.tokenLogin,
        
                        }, { headers: {
                            Authorization : 'Bearer ' + usuario.tokenLogin
                        }})
                        .then(function(response){
                            
                            if(response.data == true)
                                window.location.href = "/project";
                                //En la pestaña project, antes en el listar, ponemos todo dentro del response del getDataByToken
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
                                /* alert("Necesita autenticarse!!")
                                window.location = '/login'; */
                                
                            }
                        })
                    } else if(response.status == 204){
                        me.$swal.fire({
                            icon: 'warning',
                            title: 'Las credenciales no son las correctas',
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                    
                    
                           /*  alert('Las credenciales no son las correctas'); */
                  
                      /*   alert("Las credenciales no son las correctas"); */
                    }
                })
                .catch(function (error) {
                    if  (st == 204){
                        me.$swal.fire({
                            icon: 'warning',
                            title: 'Las credenciales no son las correctas',
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                        /* alert('Las credenciales no son las correctas'); */
                    }
                    else{
                        me.$swal.fire({
                            icon: 'warning',
                            title: 'No hay servicio. Intente nuevamente en unos segundos.'+ st,
                            showConfirmButton: false, 
                             timer: 2000 
                          })
                      /*   alert("No hay servicio. Intente nuevamente en unos segundos. " + st);  */
                    }
                    
                });
        },
    },
};