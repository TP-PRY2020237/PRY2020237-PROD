<template>
  <div :class="(data.find(x => x.name == 'TextAligment').options.find(x => x.name == 'Left').value ? 'text-left ' : '') +
                (data.find(x => x.name == 'TextAligment').options.find(x => x.name == 'Center').value ? 'text-center ' : '') +
                (data.find(x => x.name == 'TextAligment').options.find(x => x.name == 'Right').value ? 'text-right ' : '')">
    <p
        :class="(data.find(x => x.name == 'TextFormat').options.find(x => x.name == 'Bold').value ? 'font-weight-bold ' : '') +
                (data.find(x => x.name == 'TextFormat').options.find(x => x.name == 'Italic').value ? 'font-italic ' : '') +
                (data.find(x => x.name == 'TextFormat').options.find(x => x.name == 'Underline').value ? 'text-decoration-underline ' : '')"
        v-bind:style="{'font-size':data.find(x => x.name === 'FontSize').value + 'px'}">
        {{data.find(x => x.name === 'DisplayName').value}}
    </p>
  </div>
</template>

<script>
export default {
  name: "TextComponentTemplate",
  props: {
    data: {
      type:Array,
    }
  },
  
}

</script>

<style scoped src="@/bootstrap/bootstrap.css">

</style>
