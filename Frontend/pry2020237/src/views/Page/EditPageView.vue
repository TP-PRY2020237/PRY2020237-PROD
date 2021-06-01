<template>
  <v-app id="inspire">
    <v-main style="background: #fbfbfd">
      <v-container
        fluid
        class="mx-6 px-6"
        style="margin: 0px; padding: 0px; width: 97%"
      >
        <!-- fila del nombre y botones -->
        <v-row>
          <v-col>
            <div class="text-lefth">
              <p class="header-title">
                <v-form ref="form">
                  <v-row>
                    <span v-if="activeEdit == false">
                      {{ namePageView }}
                    </span>
                    <div v-else v-bind:style="{ width: '375px' }">
                      <v-text-field
                        :disabled="activeEdit == false"
                        v-model="namePageView"
                        label="Nombre de la vista"
                        :rules="nameRules"
                        filled
                        required
                        prepend-inner-icon="drive_file_rename_outline"
                      >
                      </v-text-field>
                    </div>
                    <v-btn
                      class="mx-2"
                      fab
                      small
                      color="primary"
                      @click="setActiveEdit"
                    >
                      <v-icon v-if="activeEdit == false">
                        mdi-pencil
                      </v-icon>
                      <v-icon v-else>
                        mdi-cancel
                      </v-icon>
                    </v-btn>
                    <v-btn
                      v-if="activeEdit == true"
                      class="mx-2"
                      fab
                      small
                      color="primary"
                      @click="saveNewName"
                    >
                      <v-icon>
                        mdi-content-save
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-form>
              </p>
            </div>
          </v-col>
          <!-- buttons -->
          <v-col>
            <div class="text-right">
              <button @click="goBack" class="buttons-header">
                Cancelar
              </button>
              <v-btn
                class="buttons-header"
                :loading="loadingSaveTemplate"
                :disabled="loadingSaveTemplate"
                @click="SaveEdition"
              >
                <v-icon>
                  save
                </v-icon>
                Guardar
              </v-btn>
              <button                
               @click="downloadHTMLBody"
                class="buttons-header primary">
                <v-icon color="#ffffff">
                  download
                </v-icon>
                Download
              </button>
              <!-- <v-btn rounded class="ma-2" color="primary" @click="goBack" dark>
                Cancelar
              </v-btn>
              <v-btn
                rounded
                class="ma-2"
                color="secondary"
                :loading="loadingSaveTemplate"
                :disabled="loadingSaveTemplate"
                @click="SaveEdition"
                primary
              >
                Guardar
              </v-btn>
              <v-btn
                rounded
                class="ma-2"
                color="secondary"
                @click="downloadHTMLBody"
                dark
              >
                Download
              </v-btn> -->
            </div>
          </v-col>
        </v-row>
        <!-- Componentes - vista - atributos -->
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--componentes  -->
              <v-col
                v-if="!loading"
                cols="12"
                style="height: 70vh; position:relative"
              >
                <v-list flat style="height: 90%; overflow: auto">
                  <v-subheader>Componentes</v-subheader>
                  <EditPageSidebarMenu
                    v-for="(child, i) in tree.root.childrens"
                    :key="i"
                    :componentSelected="componentSelected"
                    :child="child"
                    v-on:select-component="selectComponent($event)"
                    :editableState="editableState"
                    :tree="tree.root"
                    :componentDataDictionary="componentDataDictionary"
                    :pageViewId="PageViewId"
                  />
                  <!-- <v-list-item-group color="secundary">
                    <v-list-item
                      v-for="(item, i) in componentDetectedArray"
                      :key="item.id"
                      @click="ClicInComponent(item)"
                      v-bind:style="{
                        background:
                          item.id === componentSelected.id ? '#2196F3' : '',
                        color:
                          item.id === componentSelected.id ? '#ffffff' : '',
                      }"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          v-if="item.componentType != null"
                          v-text="
                            i +
                              1 +
                              '. ' +
                              GetTextInSpanish(item.componentType.name)
                          "
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group> -->
                </v-list>
                <div style="height: 10%">
                  <v-btn
                    class="buttons-header primary sidebar"
                    style="text-transform: none"
                    @click="addComponents"
                  >
                    {{editableState ? "Editar": "Agregar"}}
                  </v-btn>
                </div>
              </v-col>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet rounded="lg">
              <!-- html -->
              <div style="height: 70vh;overflow: auto; " >
                <v-col
                  cols="12"
                  id="HTMLRenderSection"
                  style="position: relative; pointer-events: none;"
                >
                  <div v-if="!loading">
                    <RenderHTMLSection
                      :component-selected="componentSelected"
                      :tree="tree"
                    />
                    <div></div>
                  </div>
                  <!--
                  <div id="HTMLCover" style="
                      top: 0px;
                      left: 0px;
                      width: 100%;
                      height: 100%;
                      position: absolute;
                  "></div>
                  -->
                </v-col>
              </div>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  atributos-->
              <v-col cols="12" style="height: 70vh; overflow: auto;">
                <v-list flat>
                  <v-subheader>Atributos</v-subheader>

                  <div
                    v-for="(item, i) in attributesJson.data"
                    :key="i + 1 + 'Attribute'"
                    class="px-4"
                  >
                    <!--PARA TEXTOS-->
                    <v-text-field
                      v-if="
                        item.type == 'String' && item.isVisibleToUser == true
                      "
                      outlined
                      :label="item.displayName"
                      v-model="item.value"
                    >
                    </v-text-field>
                    <!--PARA RADIO BUTTONS-->
                    <v-radio-group
                      v-if="
                        item.type == 'Boolean' && item.isVisibleToUser == true
                      "
                      :label="item.displayName"
                      v-model="item.value"
                    >
                      <v-radio label="Si" :value="true"></v-radio>
                      <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                    <!--PARA NUMEROS-->
                    <v-text-field
                      v-if="
                        item.type == 'Integer' && item.isVisibleToUser == true
                      "
                      outlined
                      :label="item.displayName"
                      v-model="item.value"
                      type="number"
                    >
                    </v-text-field>

                    <!--PARA ENLACES -->
                    <v-combobox
                      v-if="item.type == 'Link' && item.isVisibleToUser == true"
                      v-model="item.value"
                      :label="item.displayName"
                      :items="otherViewsName"
                      outlined
                    >
                    </v-combobox>

                    <!--PARA SELECCIONAR OPCIONES PREDEFINIDAS-->
                    <v-combobox
                      v-if="
                        item.type == 'Select' && item.isVisibleToUser == true
                      "
                      v-model="item.value"
                      :label="item.displayName"
                      :items="item.options"
                      outlined
                    >
                    </v-combobox>
                    <!--PARA SELECCIONAR OPCIONES DE teXTO-->
                    <h4
                      v-if="
                        item.type == 'Multioption' &&
                          item.isVisibleToUser == true
                      "
                    >
                      {{ item.displayName }}
                    </h4>
                    <v-row
                      v-if="
                        item.type == 'Multioption' &&
                          item.isVisibleToUser == true
                      "
                    >
                      <v-col
                        v-for="(option, pos) in item.options"
                        :key="pos + 'option' + option.name"
                      >
                        <v-btn
                          icon
                          @click="
                            () => {
                              option.value = !option.value;
                            }
                          "
                          :outlined="option.value"
                        >
                          <v-icon dark>
                            {{ option.icon }}
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>

                    <!--PARA AÑADIR OPCIONES COMBOBOX-->

                    <v-text-field
                        v-if="item.type == 'Array' && item.isVisibleToUser == true"
                        v-model="newValueCombo"
                        clear-icon="mdi-plus-circle"
                        clearable
                        label="Nueva opción"
                        type="text"
                        @click:clear="() => {item.items.push(newValueCombo);}"
                    ></v-text-field>

                    <v-combobox
                        v-if="item.type == 'Array' && item.isVisibleToUser == true"
                        v-model="item.value"
                        :label="item.displayName"
                        :items="item.items"
                        outlined
                    >
                      <template slot="item" slot-scope="data">
                         {{data.item}}
                        <!--
                          <v-btn icon v-on:click="deleteOption(item.items,data.item)">
                            <v-icon size="24px">mdi-delete</v-icon>
                          </v-btn>
                          -->
                      </template>
                    </v-combobox>


                  </div>
                </v-list>
              </v-col>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script src="@/Entities/LocalizationES.js"></script>

<script
  type="application/javascript"
  src="@/controllers/Page/EditPageViewComponentBase.js"
></script>

<style scoped>

.header-title{
  font-size: 32px;
  font-weight: 700;
}
.buttons-header {
  margin-right: 24px !important;
  padding: 8px 32px !important;
  border-radius: 1000px;
  background: #f1f1f1 !important;
  box-shadow: none;
  text-transform: none !important;
  font-size: 16px !important;
  letter-spacing: 0px !important;
  opacity: 0.5;
  transition: all 0.2 ease-in-out;
}
.buttons-header.primary {
  opacity: 0.8;
  background: #1976d2;
  color: #fff;
}
.buttons-header.sidebar {
  width: 100%;
}
.buttons-header:hover {
  opacity: 1;
}
</style>
