<template>
  <main style="height: 100%">
    <v-container class=" pa-0" fill-height  fluid>
      <v-row align="center">
        <v-col cols="12" style="overflow-y: auto;">
          <!--TITULO-->
          <v-toolbar class="mx-auto" flat color="transparent" width="80%">
            <v-spacer></v-spacer>
            <v-toolbar-title class="primary--text center--text"
                             style="font-size: 48px;
                               font-weight: bold;
                               font-family: 'Roboto'">
              GUIA DE DISEÑO
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <br>
          <!--SUBTITULO-->
          <v-toolbar class="mx-auto" flat color="transparent" width="80%">
            <v-spacer></v-spacer>
            <v-toolbar-title class="center--text"
                             style="font-size: 24px;
                                 text-align: center;
                                 color: rgba(0, 0, 0, 0.54);
                                 font-weight: bold;
                                 font-family: 'Roboto'">
              La IA de Wire2Web es bastante inteligente, pero todo el mundo comete errores, ¿verdad? <br>
              Esta página proporciona algunos consejos y trucos para que puedas obtener los mejores resultados posibles.
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <br>
          <br>
          <!--CARD-->
          <v-card class="mx-auto" width="80%" elevation="0">
            <v-tabs vertical>
              <v-tab style="justify-content: left;">
                <v-icon left> mdi-format-text </v-icon> Text/Paragraph
              </v-tab>
              <v-tab style="justify-content: left;">
                <v-icon left> mdi-image </v-icon> Images
              </v-tab>
              <v-tab style="justify-content: left;">
                <v-icon left> mdi-cursor-text </v-icon> Text Input
              </v-tab>
              <v-tab style="justify-content: left;">
                <v-icon left> mdi-chevron-down</v-icon> Combobox 
              </v-tab>
              <v-tab style="justify-content: left;">
                <v-icon left> mdi-cursor-text </v-icon> Number Input
              </v-tab>
              <v-tab style="justify-content: left;">
                <v-icon left> mdi-cursor-pointer </v-icon> Buttons
              </v-tab>
              <v-tab style="justify-content: left;">
                <v-icon left> mdi-checkbox-blank-circle-outline </v-icon> Radio Buttons
              </v-tab>

              <v-tab style="justify-content: left;">
                <v-icon left>mdi-checkbox-marked-outline </v-icon> Check-Box
              </v-tab>

              <v-tab style="justify-content: left;">
                <v-icon left> mdi-format-paragraph </v-icon> Text Area
              </v-tab>
            <!-- TEXT / PARAGRAPH -->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       TEXT / PARAGRAF
                       </p>
                        <p class="text-h6 mb-6">
                          Generalmente representado como líneas rectas, ondeadas o con el texto “Lorem Ipsum”
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col cols="6" sm="3">
                              <v-img src="@/img/wireframeGuide/text-wireframe.jpg"></v-img>
                            
                            </v-col >
                            <v-divider vertical></v-divider>
                            <v-col cols="6" sm="3">
                                 <v-img src="@/img/wireframeGuide/text-Bootstrap.png"></v-img>
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
                <!-- IMAGES -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       IMAGE
                       </p>
                        <p class="text-h6 mb-6">
                          Representado como un cuadrado con dos líneas cruzadas de un extremo a otro dentro de la misma figura.
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/squareImage-wireframe.png"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/squareImage-bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>

               <!-- TEXT INPUT -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       TEXT INPUT
                       </p>
                        <p class="text-h6 mb-6">
                          Representado dependiendo de su tipo, si fuera un cuadro de ingreso de texto se representa como un rectángulo vacío, si fuera un input number se representa como un rectángulo con dos flechas opuestas en su interior.
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/textInput-wireframe.png"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/textInput-bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>

<!-- COMBOBOX -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       COMBOBOX
                       </p>
                        <p class="text-h6 mb-6">
                         Para la representación de un combo box se deberá realizar el dibujo de un rectángulo junto a un cuadrado, ubicado al lado derecho, con un triangulo invertido dentro. 
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/combobox_wireframe.jpg"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/combobox_bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>

               <!-- NUMBER INPUT -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       NUMBER INPUT
                       </p>
                        <p class="text-h6 mb-6">
                          Representado como un rectángulo con dos flechas opuestas en su interior.
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/numberInput-wireframe.jpg"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/numberInput-bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>







              <!-- BUTTONS -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       BUTTONS
                       </p>
                        <p class="text-h6 mb-6">
                          Representado como un rectángulo con un texto en su interior.
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/button-wireframe.jpg"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/button-bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- RADIO BUTTONS -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       RADIO BUTTON
                       </p>
                        <p class="text-h6 mb-6">
                          Para la representación de un radio button existen dos posibilidades: (1) Para el radio button seleccionado se representará mediante un círculo con su relleno pintado. (2) Para el radio button no seleccionado se representará mediante un círculo con su relleno en blanco.
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/radioButton-wireframe.jpg"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/radioButton-bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- CHECK BOX -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                       CHECK BOX
                       </p>
                        <p class="text-h6 mb-6">
                          Para la representación de un check box existen dos posibilidades: (1) Para el check box seleccionado se representará mediante un cuadrado con un check adentro.(2) Para el check box no seleccionado se representará mediante un cuadrado con su relleno en blanco.
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/checkBox-wireframe.jpg"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/checkBox-bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>

             <!-- TEXT AREA -->
              <v-tab-item>
              <v-card flat>
                  <v-card-text>
                     <div class="text-center">
                       <p class="font-weight-black text-h5 mb-6 ">
                      TEXT AREA
                       </p>
                        <p class="text-h6 mb-6">
                         La representación de un text area se hace mediante el dibujo de un cuadrado de tamaño mediano-grande con líneas rectas en su interior.
                          </p>
                      </div >
                      <v-divider></v-divider>
                      <v-container fill-height fluid>
                        <v-row align="center"
                            justify="center">
                            <v-col   cols="6" sm="3">
                              
                              <v-img src="@/img/wireframeGuide/textArea-wireframe.jpg"
                             ></v-img>
                                
                             
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col   cols="6" sm="3" >
                              
                                 <v-img src="@/img/wireframeGuide/textArea-bootstrap.png"
                               ></v-img>
                              
                            </v-col>
                        </v-row>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>

            </v-tabs>
          </v-card>
          <br>
          <div class="mx-auto" style="text-align: center;">
            <v-btn href="files/Wire2Web_Guia_de_Wireframes.pdf" download color="primary" rounded style="width: 20rem" target="_top">
              Descargar guia de diseño
              <v-icon right> mdi-download </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script  type="application/javascript" src="@/controllers/Guide/WireframeGuideBase.js">
</script>