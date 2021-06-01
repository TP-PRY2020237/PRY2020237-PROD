<template>
  <v-main class="pa-0">
    <v-container class="white lighten-5 fill-height pa-0" fluid>
      <v-row align="center" no-gutters>
        <v-col cols="8" class="fill-height ga">
          <v-img class="fill" src="@/resources/images/Wireframe.jpg"> </v-img>
        </v-col>
        <v-col cols="4" class="pa-4 form-containercc" style="overflow-y: auto;">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="10">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div>
                  <h1 class=" text-center">
                    Registrar Cuenta
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
                        filled
                        rounded
                        v-model="firstName"
                      ></v-text-field>
                    </v-col>
                    <v-col class="align-center justify-space-between" cols="12">
                      <v-text-field
                        :rules="lastnameRules"
                        label="Apellidos"
                        id="lastname"
                        required
                        filled
                        rounded
                        v-model="lastName"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
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
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        prepend-inner-icon="mdi-lock"
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        type="password"
                        id="password"
                        filled
                        rounded
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <button :disabled="!valid" class="cancel-button" @click="dialog = false">
                    Cancelar
                  </button>
                  <v-btn
                    rounded
                    large
                    :disabled="!valid"
                    class="mr-4 buttons-register"
                    @click="save"
                    >Guardar</v-btn
                  >
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
  height: 55px;
}
.cancel-button {
  margin-right: 24px;
  color: #1976d2;
  font-size: 16px;
}
.buttons-register {
  margin-right: 24px !important;
  padding: 0px 32px !important;
  border-radius: 1000px !important;
  opacity: 0.8 !important;
  transition: all 0.2 ease-in-out !important;
  border: 1px solid transparent !important;
  color: #ffffff !important;
  background: #1976d2 !important;
  font-size: 14px !important;
  height: 44px !important;
  text-transform: initial !important;
  box-shadow: none;
}

.buttons-register:hover {
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
  src="@/controllers/User/RegisterBase.js"
></script>
