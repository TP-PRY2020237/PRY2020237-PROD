<template>
  <v-app id="inspire">
    <v-main class="pa-0">
      <v-container class="white lighten-5 pa-0 container-theme">
        <v-row>
          <!--Columna 1-->
          <v-col cols="12" sm="4" class="fill-height">
            <div style="margin-top: 1rem;">
              <p  style="margin-bottom: 27px !important" class="font-weight-black text-h5 mb-6 ">
                ESCOGER TEMA
              </p>
            </div>

            <v-sheet min-height="65vh" rounded="lg">
              <div>
                <div @click="showRemedy(1)" class="card-theme blue-card-theme">
                  <p>Blue</p>
                </div>
                <div @click="showRemedy(3)" class="card-theme grey-card-theme">
                  <p>Grey</p>
                </div>
                <div @click="showRemedy(4)" class="card-theme pink-card-theme">
                  <p>Pink</p>
                </div>
                <div @click="showRemedy(6)" class="card-theme solar-card-theme">
                  <p>Solar</p>
                </div>
                <div @click="showRemedy(0)" class="card-theme light-card-theme">
                  <p>Light</p>
                </div>
                <div @click="showRemedy(2)" class="card-theme dark-card-theme">
                  <p>Dark</p>
                </div>
              </div>
            </v-sheet>
          </v-col>

          <!--Columna 2-->
          <v-col cols="7" class="pa-4">
            <v-row>
              <v-col md="13">
                <div class="preview-title-container">
                  <p class="font-weight-black text-h5 mb-6 ">
                    PREVIEW
                  </p>
                  <div>

                    <button @click="$router.push('/pageView/' + idProject)" class="buttons-theme-header sky-button">
                      Regresar
                    </button>
                    <button  @click="save" class="buttons-theme-header blue-button" :disabled="globColTmp==-1">  
                      Guardar
                    </button>
                                
                  </div>
                </div>
                <v-sheet rounded="lg" max-height="800">
                  <template>
                    <v-carousel v-model="model" height="70vh" hide-delimiters>
                      <v-carousel-item
                        v-for="item in resultsToCar"
                        :key="item"
                        style="height:100%"
                      >
                        <div style="height:100% ">
                          <iframe
                            style="pointer-events: none;border:none;"
                            :srcdoc="item"
                            width="100%"
                            height="100%"
                          ></iframe>
                        </div>
                      </v-carousel-item>
                    </v-carousel>
                  </template>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container> </v-main
  ></v-app>
</template>

<style scoped>

.container-theme{
  margin-top: 64px;
}
.blue-card-theme {
  background: #2b3e50;
  color: white;
}

.grey-card-theme {
  background: #9e9e9e;
  color: white;
}

.pink-card-theme {
  background-image: linear-gradient(
    90deg,
    rgb(7, 190, 250),
    rgb(71, 76, 177),
    rgb(229, 27, 117)
  );
  color: white;
}

.solar-card-theme {
  background: #b58900;
  color: white;
}

.light-card-theme {
  background: #ffffff;
  color: #242424;
}

.dark-card-theme {
  background: #000000;
  color: white;
}

.card-theme {
  width: 100%;
  cursor: pointer;
  height: 64px;
  box-shadow: 0 3px 6px 1px rgba(25, 25, 25, 0.2);
  border-radius: 4px;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-theme p {
  margin: 0 !important;
}

.buttons-theme-header {
  margin-right: 24px;
  padding: 8px 32px;
  border-radius: 1000px;
  /* border: 1px solid #dedede; */
  opacity: 0.8;
  transition: all 0.2 ease-in-out;
  border: 1px solid transparent;
  color: #ffffff;
}

.buttons-theme-header:hover{
  opacity: 1;
}
.buttons-theme-header.blue-button{
  background: #1976d2;
}
.buttons-theme-header.sky-button{
  background: #63aaf1;
}
.preview-title-container p{
  margin: 0 !important;
}
.preview-title-container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

</style>
<script
  type="application/javascript"
  src="@/controllers/Page/PageTheme.js"
></script>
