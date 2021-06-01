<template>
  <v-menu

      :close-on-content-click="false"
      :nudge-width="170"

      offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          style="max-width: 600px"
          color="transparent"
          v-bind="attrs"
          elevation="0"
          v-on="on"
      >
        <v-icon color="white">mdi-account</v-icon>
      </v-btn>

    </template>

    <v-card >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="@/resources/images/profile.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{name}}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
          nav
          dense
      >
        <v-list-item-group

            active-class="deep-grey--text text--accent-4"
        >
          <v-list-item  @click="goToPerfil">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>  Perfil</v-list-item-subtitle>
          </v-list-item>

          <v-list-item @click="goToProjects">
            <v-list-item-icon>
              <v-icon>mdi-briefcase</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>Proyectos</v-list-item-subtitle>
          </v-list-item>

          <v-list-item  @click="cerrarSesion">

            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>Cerrar Sesión</v-list-item-subtitle>
          </v-list-item>
        </v-list-item-group>
      </v-list>


    </v-card>
  </v-menu>
</template>

<script>
export default {
name: "UserOptionsComponent",
  data () {
    return {
      name: ""
    }
  },
  created() {
    let me = this;
    if (localStorage.getItem("usuario") != null) {
      let firstName = localStorage.getItem("usuario");
      me.name = firstName;
    }
  },
  methods:{
    goToPerfil() {
      window.location.href = "/perfil";
    },
    goToProjects() {
      window.location.href = "/project";
    },
    cerrarSesion() {
      if (localStorage.getItem("tokenDataTrue") != null) {
        localStorage.removeItem("tokenDataTrue");
      }
      window.location.href = "/";
    },
  }
}
</script>

<style scoped>

</style>