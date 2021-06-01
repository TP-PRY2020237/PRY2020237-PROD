<template>
  <v-app id="inspire">
    <!--SE AGREGÓ-->

    <v-container style="background: transparent;">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="0">
            <v-form ref="form" lazy-validation>
              <div>
                <h1 class=" text-center">
                  Actualizar Datos
                </h1>
              </div>
              <v-spacer></v-spacer>
              <v-container>
                <v-row class="mx-2">
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-text-field
                      :rules="nameRules"
                      label="Nombres"
                      id="firstname"
                      required
                      v-model="firstName"
                      :value="firstName"
                      outlined
                      rounded
                      filled
                      prepend-inner-icon="account_circle"
                    ></v-text-field>
                  </v-col>
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-text-field
                      :rules="lastnameRules"
                      label="Apellidos"
                      id="lastname"
                      required
                      :value="lastName"
                      outlined
                      rounded
                      filled
                      prepend-inner-icon="account_box"
                      v-model="lastName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-inner-icon="alternate_email"
                      filled
                      v-model="email"
                      :rules="emailRules"
                      label="Correo Electronico"
                      id="email"
                      disabled
                      outlined
                      rounded
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-inner-icon="mdi-lock"
                      v-model="password"
                      :rules="passwordRules"
                      label="Contraseña"
                      filled
                      type="password"
                      id="password"
                      disabled
                      outlined
                      rounded
                      required
                    ></v-text-field>
                    <!--Mensaje Inferior-->
                    <v-alert style="margin-top: 2rem" color="primary" text>
                      Recuerda que tu nueva contraseña debera contener por lo
                      menos una mayuscula, un numero y más de 5 caracteres.
                      <br />
                      <strong
                        >Nota : Tener todos los campos llenos es
                        requerido</strong
                      >
                    </v-alert>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="buttons-edit-profile btn-red"
                  @click="$router.push('/perfil')"
                >
                  Cancelar</v-btn
                >
                <v-btn
                  :disabled="!valid"
                  class="buttons-edit-profile btn-blue"
                  @click="save"
                >
                  Actualizar</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<style scoped>
.buttons-edit-profile {
  margin-right: 24px !important;
  padding: 8px 32px !important;
  border-radius: 1000px !important;
  border: 1px solid #dedede !important;
  box-shadow: none !important;
  opacity: 0.8 !important;
  transition: all 0.2 ease-in-out !important;
  border: 1px solid transparent !important;
  text-transform: initial !important;
}
.btn-blue {
  color: #ffffff !important;
  background: #1976d2 !important;
}
.btn-red{
  color: #ffffff !important;
  background: #ff5225 !important;

}
.buttons-edit-profile:hover {
  opacity: 1;
}
</style>
<script
  type="application/javascript"
  src="@/controllers/User/EditProfileBase.js"
></script>
