<template>
  <v-main class="pa-0">
    <v-container class="white lighten-5 fill-height pa-0" fluid>
      <v-row align="center" class="" no-gutters>
        <!--Columna 1-->
        <v-col cols="4" class="pa-4 form-containercc" style="overflow-y: auto;">
          <v-form ref="form" v-model="valid" lazy-validation>
            <!--Titulo-->
            <div>
              <h1 class=" text-center">Nueva Contraseña</h1>
            </div>
            <!--Input Field-->
            <v-text-field
              style="margin-top: 2rem"
              prepend-inner-icon="mdi-lock"
              :rules="passwordRules"
              label="Nueva Contraseña"
              type="password"
              id="password"
              v-model="user.password"
              required
              outlined
              rounded
            >
            </v-text-field>

            <!--Boton-->
            <v-btn
              class="buttons-recovery"
              :disabled="!valid"
              color="primary"
              @click="save"
              block
              rounded
            >
              Actualizar
            </v-btn>
          </v-form>

          <!--Mensaje Inferior-->
          <v-alert style="margin-top: 2rem" color="primary" text>
            Tu nueva contraseña debera contener por lo menos una mayuscula, un
            numero y más de 5 caracteres.
            <br />
            <strong
              >Nota : El botón se deshabilitará si no se cumple con las
              reglas</strong
            >
          </v-alert>
        </v-col>
        <!--Columna 2-->
        <v-col cols="8" class="fill-height ga">
          <v-img class="fill" src="@/resources/images/SecurityPassword.jpg">
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.buttons-recovery {
  margin-right: 24px !important;
  padding: 24px 32px !important;
  height: 44px !important;
  border-radius: 1000px !important;
  opacity: 0.8 !important;
  transition: all 0.2 ease-in-out !important;
  border: 1px solid transparent !important;
  color: #ffffff !important;
  background: #1976d2 !important;
  font-size: 14px !important;
  width: 100% !important;
  text-transform: initial !important;
  box-shadow: none;
}

.buttons-recovery:hover {
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
  src="@/controllers/User/NewPasswordBase.js"
></script>
<!---->
