<template>
  <v-app id="inspire">
    <template v-for="(n, item) in users.length">
      <v-col style="background: #fbfbfd;" :key="n">
        <div class="pa-12" style="margin-top: 64px" width="1920px">
          <div style="width: 100%; text-align:center;">
            <h1 class="mobile-title" >
              Tu perfil
            </h1>
          </div>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="5">
                  <v-img
                    src="@/resources/images/profile2.png"
                    max-height="400"
                    max-width="400"
                  ></v-img>
                </v-col>

                <v-col class="user-container" cols="12" sm="7">
                  <h1 class="title-user">
                    Tu perfil
                  </h1>
                  <v-row>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        label="Nombres"
                        id="firstname"
                        required
                        v-model="NameUser"
                        :value="NameUser"
                        outlined
                        rounded
                        disabled
                        filled
                        prepend-inner-icon="account_circle"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="8">
                      <v-text-field
                        label="Apellidos"
                        id="lastname"
                        required
                        :value="LastNameUser"
                        filled
                        prepend-inner-icon="account_box"
                        outlined
                        rounded
                        v-model="LastNameUser"
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="8">
                      <v-text-field
                        prepend-inner-icon="alternate_email"
                        v-model="EmailUser"
                        label="E-mail"
                        id="email"
                        outlined
                        rounded
                        filled
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-btn
                        class="buttons-profile"
                        @click="
                          $router.push({
                            path: '/EditProfile',
                            params: 'users',
                          })
                        "
                      >
                        Editar</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </v-col>
    </template>
  </v-app>
</template>

<style scoped>
.mobile-title {
  display: none;
}

.title-user {
  transform: translateY(-48px);
}
.user-container {
  transform: translateY(-48px);
}
.buttons-profile {
  margin-right: 24px !important;
  padding: 8px 32px !important;
  border-radius: 1000px !important;
  border: 1px solid #dedede !important;
  box-shadow: none !important;
  opacity: 0.8 !important;
  transition: all 0.2 ease-in-out !important;
  border: 1px solid transparent !important;
  color: #ffffff !important;
  width: 100% !important;
  background: #1976d2 !important;
  text-transform: initial !important;
}
.buttons-profile:hover {
  opacity: 1;
}
@media (max-width: 600px) {
  .mobile-title {
    display: initial;
    text-align: center !important;
    width: 100%;
  }
  .user-container {
    
  transform: translateY(0px);
}

  .title-user {
    display: none;
  }
}
</style>

<script
  type="application/javascript"
  src="@/controllers/User/PerfilBase.js"
></script>
