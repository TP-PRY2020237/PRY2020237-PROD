<template>
  <v-main class="pa-0">
    <v-container class="white lighten-5 fill-height pa-0" fluid>
      <v-row align="center" no-gutters>
        <!--Columna 1-->
        <v-col cols="4" class="pa-4 form-containercc" style="overflow-y: auto;">
          <v-form ref="form">
            <!--Titulo-->
            <div>
              <h1 class=" text-center">Recuperación de contraseña</h1>
            </div>
            <!--Input Field-->
            <v-text-field
              style="margin-top: 2rem"
              v-model="email"
              :rules="emailRules"
              label="Correo Electronico"
              id="email"
              required
              outlined
              rounded
            >
            </v-text-field>

            <!--Boton-->
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="RecoverMethod"
              block
              rounded
              class="buttons-recovery"
            >
              Recuperar
            </v-btn>

            <!--Mensaje Inferior-->
            <v-alert style="margin-top: 2rem" color="primary" text>
              Escribe tu e-mail y se enviara un mensaje a tu correo electronico
              para restablecer la contraseña.
              <br />
              <strong>Nota : Esto puede tardar unos segundos </strong>
            </v-alert>
          </v-form>
        </v-col>
        <!--Columna 2-->
        <v-col cols="8" class="fill-height ga">
          <v-img class="fill" src="@/resources/images/DesignWireframe.jpg">
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
.buttons-recovery {
  margin-right: 24px !important;
  padding: 0px 32px !important;
  height: 56px !important;
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
  height: 44px !important;
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
  src="@/controllers/User/ForgotPasswordBase.js"
></script>

<!--

-->
