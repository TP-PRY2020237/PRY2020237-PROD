<template>
  <v-main class="pa-0">
    <br /><br /><br />
    <v-stepper alt-labels v-model="currentStepper">
      <!--TITULOS-->
      <v-stepper-header>
        <v-stepper-step :rules="[() => step1IsValid]" step="1">
          Subir Wireframes
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">
          Detectando los componentes
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Guardar los componentes encontrados
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          Vista previa
        </v-stepper-step>
      </v-stepper-header>
      <!--CONTENIDO-->
      <v-stepper-items>
        <v-stepper-content step="1" class="pa-0">
          <v-container class="white lighten-5 pa-0" fluid>
            <v-row align="center" class="" no-gutters>
              <!--Columna 1-->
              <v-col cols="7" class="pa-4" style="overflow-y: auto;">
                <v-form ref="form" lazy-validation>
                  <!--Titulo-->
                  <div>
                    <h1 class=" ">Sube tu imagen</h1>
                  </div>
                  <br>

                  <input
                    type="file"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  />

                  <v-text-field
                    style="margin-top: 2rem"
                    :rules="nameRules"
                    required
                    outlined
                    rounded
                    v-model="name"
                    label="Nombre de la vista"
                  >
                  </v-text-field>

                  <v-textarea
                    label="Descripción"
                    auto-grow
                    outlined
                    rounded
                    rows="4"
                    row-height="25"
                    v-model="description"
                  >
                  </v-textarea>

                  <!--Mensaje Inferior-->
                  <v-alert style="margin-top: 2rem" color="primary" text>
                    Los componentes dibujados en la imagen deben cumplir con los
                    estadares definidos en nuestra
                    <a href="/guide" target="_blank">
                      Guia de Wireframes
                    </a>
                    <br />
                    <strong
                      >Nota : Para un mejor resultado subir una imagen bien
                      iluminada</strong
                    >
                  </v-alert>
                </v-form>
              </v-col>
              <!--Columna 2-->
              <v-col cols="5" class="pr-4">
                <div class="placeholder-image-wireframe" style="height: 35rem">
                  <v-img
                    v-if="imageURLPreview == null"
                    width="50%"
                    src="@/assets/icons/wireframe.svg"
                    style="flex: 0 0 auto !important"
                  >
                  </v-img>
                  <v-img
                    v-if="imageURLPreview != null"
                    :src="imageURLPreview"
                    height="100%"
                    contain
                  >
                  </v-img>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
        <!--Contenido del paso 2-->
        <v-stepper-content step="2">
          <v-container style="height: 600px;">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="subtitle-1 text-center" cols="12">
                Detectando los componentes de la imagen
              </v-col>
              <v-col cols="6">
                <v-progress-linear
                  color="primary accent-4"
                  indeterminate
                  rounded
                  height="6"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
        <!--Contenido del paso 3-->
        <v-stepper-content step="3">
          <v-container class="white lighten-5 pa-0" fluid>
            <v-card color="grey lighten-4" height="600px">
              <v-row align="center" class="" no-gutters>
                <!--Columna 1-->
                
                <v-col cols="7" class="pa-4" style="overflow-y: auto;">
                   
                  <v-container style="margin: 20px; padding: 50px; width: 95%">
                    <v-alert style="margin-top: 2rem" color="primary" text>
                          El nivel de precisión mejora el reconocimiento de componentes detectados en el wireframe cargado , el cual permite que la interfaz de usuario generada presente los componentes adecuados. Para poder utilizarlo seleccione  un valor desde el 0 al 100 . 
                          <br>
                          <strong>Nota : El nivel de precisión varia con respecto wireframe cargado. </strong>
                        </v-alert>
                    <v-row>
                      <v-col cols="12">
                       
                        <v-slider
                          v-model="slider"
                          @change="turned($event)"
                         
                          value="10"
                          label="Nivel de Precición"
                          thumb-label="always"
                          light
                        ></v-slider>

                        <ul style="height: 18vh; overflow: auto;">
                          <li :key="index" v-for="(item, index) in resultPrediction">
                            {{ index }} - {{ item.tagName.toUpperCase() }}
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <!--Columna 2-->
                <v-col cols="5" style="overflow-y: auto;">
                  <div style="position: relative;height: 35rem">
                    <img 
                      id="findWidth"
                      v-if="imageURLPreview != null"
                      :src="imageURLPreview"
                      height="100%"
                      contain
                      position="left"
                    >
                    <div 
                      v-for="(item, index) in resultPrediction"
                      :key="index"
                      v-bind:style="{
                        top: item.boundingBox.top * (l*v )+ 'px',   // Vertical 560=l - 396=w
                        left: item.boundingBox.left * (w*v) + 'px', //Horizontal 593=l - 800=w
                        width: item.boundingBox.width * (w*v) + 'px',//Casi cuadrado 550 550
                        height: item.boundingBox.height * (l*v) + 'px',
                        position: 'absolute',
                        border: '1px solid red',
                      }"
                    ></div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-stepper-content>
        <v-stepper-content step="4">
          <div id="RenderHTMLSection">
            <RenderHTMLSection
              v-if="tree.root"
              :component-selected="componentSelected"
              :tree="tree"
            />
          </div>
        </v-stepper-content>
      </v-stepper-items>

      <div
        v-if="currentStepper != 3 && currentStepper != 4"
        class="mx-auto"
        style="text-align: center;"
      >
        <v-btn class="buttons-steper-light"  v-if="currentStepper != 2" text @click="rig">Cancelar</v-btn>
        <v-btn
          color="primary"
          class="buttons-steper"
          @click="nextStep(currentStepper + 1)"
          :disabled="currentStepper == 2 ? true : false"
        >
          Ir al paso {{ currentStepper + 1 }}
        </v-btn>
      </div>

      <div
        v-if="currentStepper == 3"
        class="mx-auto"
        style="text-align: center;"
      >
        <v-btn class="buttons-steper-light" @click="GoToStep(1)" text>Volver al paso 1</v-btn>
        <v-btn class="buttons-steper"
          color="primary"
          :loading="loadingBuildTree"
          :disabled="loadingBuildTree"
          @click="saveImage"
        >
          Guardar
        </v-btn>
      </div>
      <div
        v-if="currentStepper == 4"
        class="mx-auto"
        style="text-align: center;"
      >
        <v-btn
          class="buttons-steper"
          color="primary"
          @click="goToProjects"
        >
          Ir a mis proyectos
        </v-btn>
      </div>
      <br />
      <br />
    </v-stepper>
  </v-main>
</template>

<style scoped>
.placeholder-image-wireframe{
  display: flex;
  align-items: center;
  justify-content: center;
}
.buttons-steper {
  margin-right: 24px !important;
  padding: 8px 32px !important;
  border-radius: 1000px !important;
  border: 1px solid #dedede !important;
  box-shadow: none !important;
  opacity: 0.8 !important;
  transition: all 0.2 ease-in-out !important;
  border: 1px solid transparent !important;
  color: #ffffff !important;
  background: #1976d2 !important;
  text-transform: initial !important;
}

.buttons-steper-light {
  margin-right: 24px !important;
  padding: 8px 32px !important;
  border-radius: 1000px !important;
  border: 1px solid #dedede !important;
  box-shadow: none !important;
  opacity: 0.8 !important;
  transition: all 0.2 ease-in-out !important;
  border: 1px solid transparent !important;
  color: #242424 !important;
  background: #ffffff !important;
  text-transform: initial !important;
}
.buttons-steper-light:hover{
  background: #efefef;
  opacity: 1;
}

.buttons-steper:hover {
  opacity: 1;
}

</style>
<script
  type="application/javascript"
  src="@/controllers/Page/StepperBase.js"
></script>

<!--
<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
      color="blue"
        :complete="e1 > 1"
        step="1"
         editable>
       Subir Wireframes
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
      color="blue"
        :complete="e1 > 2"
        step="2"
         editable
      >
      Generando Pagina Web
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"
       color="blue"
        editable>
       Guardar/Componentes encontrados
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">



        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="600px"
        >



 <div>
           <v-col

                    >
                <v-card
                    class="mx-auto"
                    max-width="600"
                    height="550px"
                >

                    <v-img
                    class="center"
                      src="https://www.elegantthemes.com/blog/wp-content/uploads/2014/10/UploadLimit-Header.png"
                    max-height="250"
                     max-width="600"
                    ></v-img>

                                    <v-col
                    cols="12"
                    sm="12"
                    >
                    <input
                      type="file"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    >
                            <v-spacer></v-spacer>
                                    </v-col>


                   <v-col
                    cols="12"
                    sm="12"
                    >

                    <v-text-field
                          :rules="nameRules"
                        outlined
                        clearable
                         v-model="name"
                          label="Nombre de la vista"
                          required

                    ></v-text-field>
                     <v-textarea
                        label="Descripción"
                        auto-grow
                        outlined
                        rows="4"
                        row-height="25"
                        shaped
                         v-model="description"

                        ></v-textarea>
                     <!--  <v-btn
          color="blue"


        >
          Guardar
        </v-btn>
</v-col>

</v-card>
</v-col>
</div>

</v-card>

<v-btn
    color="blue"
    @click="next"

>
Continue
</v-btn>

<v-btn text @click="$router.push('/pageView')">
Cancel
</v-btn>
</v-stepper-content>

<v-stepper-content step="2">
<v-card
    class="mb-12"
    color="grey lighten-1"
    height="600px"

>

  <div class="text-center">
    <v-progress-circular
        :rotate="-90"
        :size="500"
        :width="80"
        color="blue"
    >
      Generando tu pagina web
      <br>
    </v-progress-circular>
  </div>
</v-card>

<v-btn
    color="blue"
    @click="e1 = 3"
    disabled
>
  Continue
</v-btn>

<v-btn text>
  Cancel
</v-btn>
</v-stepper-content>

<v-stepper-content step="3">
<v-card
    class="mb-12"
    color="white"
    height="500px"
>
  <div v-bind:style="{'background-image': 'url(' + imageURLPreview + ')','width':'100%','height':'500px',
        'background-repeat':'no-repeat','background-size':'contain','position':'relative',}">
    <div v-for="item in resultPrediction" :key="item.probability"
         v-bind:style="{'top' : item.boundingBox.top*500 + 'px','left': item.boundingBox.left*350 + 'px',
          'position':'absolute','border':'1px solid red','width':item.boundingBox.width*350 + 'px','height': item.boundingBox.height*505 +'px'}">
    </div>
  </div>

</v-card>

<v-btn color="blue" @click="saveImage">
  Guardar
</v-btn>

<v-btn text>
  Cancel
</v-btn>
</v-stepper-content>
</v-stepper-items>
</v-stepper>


-->
