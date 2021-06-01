<template>
  <v-app style="background: #fbfbfd;" app id="inspire">
    <template>
      <v-container style="margin-top: 48px;">
        <v-row>
          <v-col cols="9">
            <div class="text-lefth">
              <h2 >
                <v-icon v-on:click="backToProjects" class="back-button">mdi-arrow-left</v-icon>

                Vistas del proyecto: {{nameTitle}}
              </h2>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="text-right">
              <v-text-field
                style="width:500px "
                filled
                rounded
                clearable
                prepend-icon="search"
                placeholder="Search"
                v-model="search"
              >
              </v-text-field>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="buttons-header-container">
              <button
                @click="$router.push({name : 'pageTheme', params: { PageViewId: PageViewId }})"
                v-bind:disabled="filteredProjects.length === 0"
                
                class="buttons-header"
              >
                <v-icon outlined>
                  palette
                </v-icon>
                Seleccione un tema
              </button>
              <button
                @click="
                  $router.push({
                    name: 'pagePreview',
                    params: { PageViewId: PageViewId, NamePage: pageViews[0].name + '.html' },
                  })
                "
                class="buttons-header"
              >
                <v-icon outlined>
                  visibility
                </v-icon>
                Previsualizar
              </button>
              <button 
              v-bind:disabled="filteredProjects.length === 0"
              @click="downloadProjectZip" class="buttons-header">
                <v-icon outlined>
                  file_download
                </v-icon>
                Descargar
              </button>
              <!-- <v-btn
                color="blue-grey"
                class="ma-2 white--text"
                @click="$router.push('/pageTheme')"
              >
                Escoger Tema
              </v-btn> -->

              <!-- <v-btn
                class="ma-2"
                color="success"
                @click="
                  $router.push({
                    name: 'pagePreview',
                    params: { NamePage: pageViews[0].name + '.html' },
                  })
                "
              >
                Previsualizar
                <template v-slot:loader>
                  <span>Loading...</span>
                </template>
              </v-btn>

              <v-btn class="ma-2" color="info" @click="downloadProjectZip">
                Descargar
                <v-icon right dark>
                  mdi-cloud-upload
                </v-icon>
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn> -->
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            color="deep-purple accent-4"
          ></v-progress-linear>
        </v-row>
      </v-container>
      <!--  -->

      <v-container>
        <v-row>
          <v-col key="create" cols="2">
            <v-card class="pa-2" align="center" width="250">
              <template>
                <v-dialog max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <div class="project-card">
                      <img
                        width="64"
                        src="@/assets/icons/wireframe.svg"
                        alt="Folder"
                      />
                    </div>
                    <div class="description">
                      <h4>Wireframe</h4>
                      <p>Añade un nuevo wireframe a tu colección</p>
                      <button
                        @click="
                          $router.push({
                            name: 'upload',
                            params: { PageViewId: PageViewId },
                          })
                        "
                        v-bind="attrs"
                        v-on="on"
                      >
                        Crear
                      </button>
                    </div>
                  </template>
                </v-dialog>
              </template>
            </v-card>
          </v-col>
          <template v-for="(wireframe, i) in filteredProjects">
            <v-col :key="i" cols="2">
              <v-card
                class="wireframe-card-created"
                max-width="250"
                height="250"
              >
                <img height="120" v-bind:src="wireframe.imgUrl" alt="" />
                <div class="filter-layer"></div>
                <div class="description">
                  <h2>{{ wireframe.name }}</h2>
                  <p>{{ wireframe.description }}</p>
                </div>
                <div class="actions-buttons">
                  <v-icon
                    class="icon-edit-wireframe"
                    @click="
                      $router.push({
                        name: 'editPageView',
                        params: {
                          PageViewId: wireframe.id,
                        },
                      })
                    "
                    color="#1976d2"
                    >edit</v-icon
                  >
                  <v-icon class="icon-delete-wireframe" v-on:click="Delete(wireframe.id)">delete</v-icon>

                  <div
                          v-if="wireframe.isPrincipal == true"
                        >
                          <v-checkbox
                            @click="UpdatePrincipal(wireframe)"
                            v-model="wireframe.isPrincipal"
                            label="Inicio"
                            hide-details
                            class="shrink mr-2 mt-0"
                          >
                          </v-checkbox>
                        </div>
                        <div v-else>
                          <v-checkbox
                            @click="UpdatePrincipal(wireframe)"
                            v-model="wireframe.isPrincipal"
                            hide-details
                            label=""
                            class="shrink mr-2 mt-0"
                          >
                          </v-checkbox>
                        </div>
                </div>
              </v-card>
              <!-- <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="8"
                  class="pa-0"
                  max-width="250"
                  max-heith="250"
                  align="center"
                >
                  <v-img
                    :src="filteredProjects[item]['imgUrl']"
                    width="250"
                    height="150"
                    aspect-ratio="1"
                  ></v-img>

                  <v-card-text class="black--text">
                    {{ filteredProjects[item]["name"] }}
                  </v-card-text>
                  <v-fade-transition>
                    <div
                      absolute
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out black v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    >
                      <v-overlay absolute>
                        <v-btn
                          small
                          color="blue darken-1"
                          @click="
                            $router.push({
                              name: 'editPageView',
                              params: {
                                PageViewId: filteredProjects[item]['id'],
                              },
                            })
                          "
                          >Editar</v-btn
                        >
                        <div
                          v-if="filteredProjects[item]['isPrincipal'] == true"
                        >
                          <v-checkbox
                            @click="UpdatePrincipal(filteredProjects[item])"
                            v-model="filteredProjects[item]['isPrincipal']"
                            label="Inicio"
                            hide-details
                            class="shrink mr-2 mt-0"
                          >
                          </v-checkbox>
                        </div>
                        <div v-else>
                          <v-checkbox
                            @click="UpdatePrincipal(filteredProjects[item])"
                            v-model="filteredProjects[item]['isPrincipal']"
                            hide-details
                            label=""
                            class="shrink mr-2 mt-0"
                          >
                          </v-checkbox>
                        </div>

                        <v-banner v-model="v0" transition="slide-y-transition">
                        </v-banner>
                      </v-overlay>
                    </div>
                  </v-fade-transition>
                  <v-btn
                    absolute
                    color="purple"
                    class="white--text"
                    fab
                    small
                    left
                    top
                    v-on:click="Delete(filteredProjects[item]['id'])"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-card>
              </v-hover> -->
            </v-col>
          </template>
        </v-row>
      </v-container>
    </template>
  </v-app>
</template>

<script
  type="application/javascript"
  src="@/controllers/Page/PageViewBase.js"
></script>
<style scoped>
.v-text-field {
  width: 650px;
}

.title-page {
  color: #242424;
  font-weight: 700;
  position: relative;
}

.buttons-header-container {
  width: 100%;
}

.pa-2,
.wireframe-card-created {
  box-shadow: 0 6px 12px 3px rgba(25,25,25,0.7);
  height: 315px !important;
  padding: 24px 24px 17px 24px !important;
}


.wireframe-card-created {
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.wireframe-card-created:hover {
  border: 1px solid #1976d2;
}
.wireframe-card-created .background-wireframe {
  height: 120px;
  position: relative;
  padding: 32px;
  border-radius: 4px;
}

.wireframe-card-created p {
  color: #fafafa;
  font-size: 14px;
}
.wireframe-card-created .background-wireframe h2 {
  font-size: 20px;
  font-weight: 700;
  color: #242424;
  margin-top: 16px;
}

.wireframe-card-created .description {
  z-index: 3;
}

.wireframe-card-created .description h2,
p {
  color: #fff;
}

.pa-2 .project-card {
  height: 128px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pa-2 .description h4 {
  font-size: 20px;
}

.pa-2 .description p {
  font-size: 14px;
  color: #6a6a6a;
}
.pa-2 .description button {
  background: #1976d2;
  color: #fff;
  padding: 12px 32px;
  border-radius: 1000px;
  margin-bottom: 24px;
  box-shadow: 2px 12px 18px #1976d21f;
  opacity: 0.9;
  transition: all 0.2s ease-in-out;
}

.pa-2 .description button:hover {
  opacity: 1;
}

.wireframe-card-created img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 81.5%;
  z-index: 1;
}

.wireframe-card-created .filter-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 81.5%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
}
.wireframe-card-created .actions-buttons {
  width: 100%;
  padding-top: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wireframe-card-created .actions-buttons i {
  cursor: pointer !important;
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  color: inherit;
}

.icon-edit-wireframe,.icon-delete-wireframe {
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
}

.icon-edit-wireframe:hover, .icon-delete-wireframe:hover {
  opacity: 1;
}
.wireframe-card-created .actions-buttons i:hover {
  opacity: 1;
  color: #1976d2;
}
.buttons-header {
  margin-right: 24px;
  padding: 8px 32px;
  border-radius: 1000px;
  /* border: 1px solid #dedede; */
  background: #f1f1f1;
  opacity: 0.8;
  transition: all 0.2 ease-in-out;
  border: 1px solid transparent;
}

.buttons-header:hover {
  opacity: 1;
  border: 1px solid #1976d2;
  background: #efefef;
}
.buttons-header:disabled{
  cursor: not-allowed;
  opacity: 0.4;
}
.buttons-header:disabled:hover{
  border: 1px solid transparent;

}
.back-button {
  cursor: pointer;
}
</style>
