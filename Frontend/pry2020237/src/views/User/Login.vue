<template>
  <v-main class="pa-0">
    <v-container class="white lighten-5 fill-height pa-0" fluid>
      <v-row>
        <!--Columna 1-->
        <v-col
          cols="8"
          lg="8"
          md="8"
          xl="8"
          sm="0"
          xs="0"
          class="fill-height ga"
        >
          <v-img
            class="fill"
            src="@/resources/images/DrawWireframe.jpg"
          ></v-img>
        </v-col>

        <!--Columna 2-->
        <v-col
          cols="4"
          xs="12"
          class="form-containercc pa-4"
          style="overflow-y: auto;display: flex; align-items:center; justify-content: center;"
        >
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="10" xs="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div>
                  <h1 class=" text-center">
                    Iniciar Sesión
                  </h1>
                </div>
                <v-spacer></v-spacer>

                <v-card-text>
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    id="email"
                    filled
                    rounded
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    v-model="password"
                    :rules="passwordRules"
                    label="Contraseña"
                    type="password"
                    id="password"
                    filled
                    rounded
                    required
                  ></v-text-field>

                  <router-link
                    @click="$router.push('/guide')"
                    flat
                    :to="{ name: 'forgotPassword' }"
                    target="_blank"
                  >
                    Recuperar contraseña
                  </router-link>
                </v-card-text>

                <v-card-actions>
                  <!-- <button @click="validate" class="buttons-login">
                    Iniciar sesión
                  </button> -->
                  <v-btn
                    rounded
                    large
                    color="primary"
                    :disabled="!valid"
                    class="mr-4 buttons-login"
                    @click="validate"
                  >
                    Iniciar Sesión
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.v-text-field {
  height: 80px;
}
.buttons-login {
  margin-right: 24px !important;
  padding: 12px 32px !important;
  border-radius: 1000px !important;
  opacity: 0.8 !important;
  transition: all 0.2 ease-in-out !important;
  border: 1px solid transparent !important;
  color: #ffffff !important;
  background: #1976d2 !important;
  width: 100% !important;
  font-size: 14px !important;
  text-transform: initial;
  box-shadow: none !important;
}

.buttons-login:hover {
  opacity: 1;
}
@media (max-width: 1000px) {
  .fill {
    display: none;
  }
  .ga {
    width: 0% !important;
    flex: 0 0 0% !important;
    max-width: 0% !important;
  }
  .form-containercc {
    width: 100% !important;
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}
</style>

<script
  type="application/javascript"
  src="@/controllers/User/LoginBase.js"
></script>
