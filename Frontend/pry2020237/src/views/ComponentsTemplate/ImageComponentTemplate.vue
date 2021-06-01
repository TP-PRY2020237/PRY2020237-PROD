<template>
    <img :src="data.find(x => x.name === 'Src').value"
         :title="data.find(x => x.name === 'Src').value"
         :alt="data.find(x => x.name === 'Alt').value"
         :class="classParam"
         :width="data.find(x => x.name === 'Width').value + '%'"
    >
</template>

<script>
export default {
  name: "ButtonComponentTemplate",
  props: {
    data: {
      type:Array,
    },
    classParam:{
      type: String,
      default: ""
    }
  }
}
</script>


<style scoped src="@/bootstrap/bootstrap.css">

</style>