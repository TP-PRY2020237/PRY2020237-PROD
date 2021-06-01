<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>

<template>
  <div class="text-center">
    <v-progress-circular
      :rotate="-90"
      :size="500"
      :width="80"
      :value="value"
      color="blue"
    >
    Generando tu pagina web
    <br>
      {{ value }}
    
    </v-progress-circular>
  </div>
</template>


<script type="application/javascript" src="@/controllers/Page/LoadingViewBase.js">
  
</script>