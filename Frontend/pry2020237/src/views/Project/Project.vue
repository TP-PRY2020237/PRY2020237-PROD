<template>
  <v-app id="inspire">
    <template>
      <v-main style="background: #fbfbfd">
        <v-container>
          <v-container>
            <v-row>
              <v-col cols="8">
                <div>
                  <h2 class="title-page ">
                    Proyectos
                  </h2>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="header-search-project">
                  <v-text-field
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
            </v-row>
          </v-container>

          <v-row>
            <v-col cols="2">
              <v-card
                class="pa-2"
                style="text-align: center"
                max-width="250"
                max-heith="250"
                align="center"
              >
                <template>
                  <v-dialog max-width="500px" v-model="dialog">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="project-card">
                        <img
                          width="64"
                          src="@/assets/icons/project.svg"
                          alt="Folder"
                        />
                      </div>
                      <div class="description">
                        <h4>Nuevo proyecto</h4>
                        <p>Almacena sus wireframes</p>
                        <button v-bind="attrs"  @click="openPopUp" v-on="on" >Crear</button>
                      </div>
                    </template>
                    <v-card outlined light>
                      
                      <v-form ref="form" lazy-validation v-model="valid">
                        <v-card-title>
                          <span  class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="12">
                                <v-text-field
                                  v-model="name"
                                  :rules="nameRules"
                                  label="Nombre de proyecto"
                                  filled
                                  clearable
                                  required
                                  prepend-inner-icon="drive_file_rename_outline"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="12">
                                <v-text-field
                                  v-model="description"
                                  label="Descripcion (opcional)"
                                  filled
                                  clearable
                                  prepend-inner-icon="topic"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions >
                          
                          <v-col align="center" >
                            <v-btn :disabled="!valid" color="custom white--text"  class="mr-4 " @click="save">
                              Guardar
                            </v-btn>
                          
                            <v-btn color="error" @click="dialog = false">
                              Cancelar
                            </v-btn>
                          </v-col>                          
                          <!-- <v-btn color="blue darken-1" text @click="save()">Save</v-btn> -->
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </template>
              </v-card>
            </v-col>

            <template v-for="(project, i) in filteredProjects">
              <v-col :key="i" cols="2">
                <v-card
                  class="project-card-created"
                  max-width="250"
                  max-heith="250"
                >
                  <div>
                    <h3 style="word-break: break-word">{{ project.name }}</h3>
                    <p style="word-break: break-word">{{ project.description }}</p>

                    <p class="date-label-updated">Última actualización</p>
                    <p class="date-value-updated">{{parseLastUpdatedDate(project.modifyDate)}}</p>
                    <a
                      @click="
                        $router.push({
                          name: 'pageView',
                          params: {
                            PageViewId: project.id,
                          },
                        })
                      "
                      >Ver detalle</a
                    >
                  </div>
                  <div class="actions-buttons">
                    <v-icon class="icon-edit-project"  @click="editItem(project)" color="#1976d2">edit</v-icon>
                    <v-icon
                      class="icon-delete-project"
                      v-on:click="Delete(project.id)"
                      color="#6a6a6a"
                      >delete</v-icon
                    >
                  </div>
                </v-card>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-main>
    </template>
  </v-app>
</template>

<script
  type="application/javascript"
  src="@/controllers/Project/ProjectBase.js"
></script>

<style>

body{font-family:'Nunito Sans', sans-serif !important}
.header-search-project{
  transform: translateY(-10px);
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
<style scoped>

.title-page {
  color: #242424;
  font-weight: 700;
  position: relative;
}




.v-text-field {
  width: 650px;
}

.pa-2,
.project-card-created {
  box-shadow: 0 6px 12px 3px rgba(25,25,25,0.7);
  height: 315px;
  padding: 24px 24px 17px 24px !important;
  background-color: #fff !important;
}

.project-card-created {
  transition: all 0.2s ease-in-out;
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

.icon-edit-project, .icon-delete-project {
  opacity: .3;
  transition: all .2s ease-in-out;
}

.icon-edit-project:hover, .icon-delete-project:hover{
  opacity: 1;
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

.project-card-created {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.project-card-created h3 {
  font-size: 22px;
  font-weight: 700;
}
.project-card-created:hover {
  border: 1px solid #1976d2;
}



.project-card-created .actions-buttons {
  width: 100%;
  border-top: 1px solid #eeeeee;
  padding-top: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.project-card-created .actions-buttons i {
  cursor: pointer !important;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}
.project-card-created .actions-buttons i:hover {
  opacity: 1;
}

.date-label-updated, .date-value-updated {
  margin: 0;
}

.date-value-updated {
  margin-bottom: 24px;
}

.date-label-updated{
  font-size: 12px;
  color: #6a6a6a;
  margin-top: 12px;
}

</style>
