<template>
  <section id="about">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="7">
              <h1 class="font-weight-light display-2">Por que se creo </h1>
              <h1 class="font-weight-light display-1 mb-3">
                WIRE2WEB!
              </h1>
              <v-row>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/img/web-programming.svg"
                    max-width="36px"
                    class="mr-4"
                  />
                  <p style="margin:0px !important"  class="text-justify">
                      La implementación del código GUI requiere tiempo y desarrolladores dedicados.

                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/img/decrease.svg"
                    max-width="36px"
                    class="mr-4"
                  />
                  <p  style="margin:0px !important" class="text-justify">
                       Desarrolladores cuentan con un tiempo reducido para implementar funcionalidades y la lógica del software que están construyendo.

                  </p>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-img
                    src="@/img/struggle.svg"
                    max-width="36px"
                    class="mr-4"
                  />
                  <p  style="margin:0px !important" class="text-justify">
                      La conversión que realizan los desarrolladores manualmente es engorroso, lento y propenso a errores.
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5" class="d-none d-md-flex">
              <v-img
                src="@/img/ill1.svg"
                class="d-block ml-auto mr-auto"
                max-width="400px"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#about {
  background-color: #f4f7f5;
}
</style>
