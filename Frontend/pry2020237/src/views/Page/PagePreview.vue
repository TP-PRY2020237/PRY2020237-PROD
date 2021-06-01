<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-container>
          <v-row>
            <v-col>
              <div class="text-lefth">
                <p class="font-weight-black text-h5 mb-6 ">
                  PREVISUALIZACIÓN
                </p>
              </div>
            </v-col>
            <!-- buttons -->
            <v-col>
              <div class="text-right">
                <button
                  @click="$router.push('/pageView/' + idProject)"
                  class="buttons-preview-header"
                >
                  Regresar
                </button>

                <!--  <v-btn
                      rounded
                       class="ma-2"
                      color="secondary"
                      dark
                    >
                      Guardar
                    </v-btn> -->
              </div>
            </v-col>
          </v-row>
        </v-container>
        <!--preview -->
        <v-row>
          <v-col cols="12" sm="12">
            <v-sheet rounded="lg" min-height="800">
              <template>
                <v-carousel
                  v-model="model"
                  height="70vh"
                  hide-delimiters
                  :show-arrows="false"
                >
                  <v-carousel-item
                    v-for="item in resultsToCar"
                    :key="item"
                    style="height:100%"
                  >
                    <iframe
                      :srcdoc="item"
                      width="100%"
                      height="100%"
                      style="border:none;"
                    ></iframe>
                  </v-carousel-item>
                </v-carousel>
              </template>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.buttons-preview-header {
  margin-right: 24px;
  padding: 8px 32px;
  border-radius: 1000px;
  /* border: 1px solid #dedede; */
  opacity: 0.8;
  transition: all 0.2 ease-in-out;
  border: 1px solid transparent;
  color: #ffffff;
  background: #1976d2;
}

.buttons-preview-header:hover {
  opacity: 1;
}
</style>
<script
  type="application/javascript"
  src="@/controllers/Page/PagePreview.js"
></script>
