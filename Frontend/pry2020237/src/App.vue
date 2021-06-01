<template>
  <v-app>

      <navigation />
 <!-- <v-app-bar app color="primary">
      <v-toolbar-title class="white--text" style="cursor: pointer" @click="$router.push('/')">
        Wire-2-Web
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="$router.push('/guide')" elevation="0" color="transparent">
          <span style="color: white">Guia de Wireframes</span>
        </v-btn>
        <v-btn @click="$router.push('/login')" elevation="0" color="transparent">
          <span style="color: white">Iniciar Sesión</span>
        </v-btn>
        <v-btn @click="$router.push('/register')" elevation="0" color="transparent">
          <span style="color: white">Registrarse</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar> -->
    <v-main>
      <router-view />
    </v-main>
 <foote />
   <!--  <v-footer color="primary" padless>
      <v-row justify="center" no-gutters >
        <v-btn color="white" text rounded class="my-2">
          <v-icon>mdi-facebook</v-icon>
          <span>Facebook</span>
        </v-btn>

        <v-btn color="white" text rounded class="my-2">
          <v-icon>mdi-instagram</v-icon>
          <span>Instagram</span>
        </v-btn>

        <v-btn color="white" text rounded class="my-2">
          <v-icon>mdi-youtube</v-icon>
          <span>YouTube</span>
        </v-btn>

        <v-col class="py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Wire2Web</strong>
        </v-col>
      </v-row>
    </v-footer> -->
  </v-app>
</template>


<script>
import navigation from "@/views/LandingPage/Navigation";
 import foote from "@/views/LandingPage/Footer";

export default {
  name: "App",

  components: {
   navigation,
   foote,
    
  },

  data: () => ({
    fab: null,
    color: "",
    flat: null,
  }),

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else {
        this.color = "transparent";
        this.flat = true;
      }
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');
*{
font-family: 'Nunito Sans', sans-serif !important;
}
</style>
