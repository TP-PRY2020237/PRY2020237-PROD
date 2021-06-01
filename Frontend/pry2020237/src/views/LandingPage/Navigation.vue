<template>
  <div>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app color="primary" :flat="flat" class="px-15" :class="{ expand: flat }">
      
      <v-toolbar-title class="white--text" style="cursor: pointer" @click="$router.push('/')">
       Wire-2-Web
      </v-toolbar-title>
      <v-spacer />
        <v-btn  @click="$router.push('/guide')" elevation="0" color="transparent">
          <span style="color: white">Guia de Wireframes</span>
        </v-btn>
        <div v-if="!isSignIn">
          <v-btn @click="$router.push('/login')" elevation="0" color="transparent">
            <span style="color: white">Iniciar Sesión</span>
          </v-btn>
          <v-btn @click="$router.push('/register')" elevation="0" color="transparent">
            <span style="color: white">Registrarse</span>
          </v-btn>
        </div>
      <div v-else>
        <UserOptionsComponent v-if="isSignIn"></UserOptionsComponent>
      </div>
    </v-app-bar>
  </div>
</template>

<style scoped>
.v-toolbar {
  transition: 0.6s;
}

.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>

<script>
import UserOptionsComponent from "@/views/Share/UserOptionsComponent";
export default {
  components: {
    UserOptionsComponent,
  },
  data: () => ({

    drawer: false,
    isXs: false,
    isSignIn: false,
    tokenDataTrue: "",
    items: [
      ["mdi-home-outline", "Home", "#hero"],
      ["mdi-information-outline", "Sobre", "#features"],
      ["mdi-download-box-outline", "Download", "#download"],
      ["mdi-currency-usd", "Preços", "#pricing"],
      ["mdi-email-outline", "Contatos", "#contact"],
    ],
  }),
  props: {
    color: String,
    flat: Boolean,
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    comprobate(){
      let me = this;
    },
    cerrarSesion() {
      if (localStorage.getItem("tokenDataTrue") != null) {
        localStorage.removeItem("tokenDataTrue");
      }
      window.location.href = "/";
    },
  },

  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    /*verificar si el item está activo o no*/ 
    let me = this;
    if (localStorage.getItem("tokenDataTrue") != null) {
      this.tokenDataTrue =  localStorage.getItem("tokenDataTrue");
      var timePast = parseInt(localStorage.getItem("dateNow"));
      var timeNow = Date.now();

      
      var resta = timeNow - timePast;
      
      if(resta > 14400000 ) {//14400000 para 4 horas - 60000 para 1 min prueba 
      
        
          me.$swal.fire({
                                    title: 'Sesión finalizada, iniciar sesión nuevamente!',
                                    icon: 'warning',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'OK'
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                       
                                         this.cerrarSesion();
                                    }
                              })
         /*  alert("Sesión finalizada, iniciar sesión nuevamente!"); */
         
      }
        
      else
        this.isSignIn = true;
    }
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
