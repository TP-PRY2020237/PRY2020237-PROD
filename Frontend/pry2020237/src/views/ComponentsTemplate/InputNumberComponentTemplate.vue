<template>
  <div>
    <input class="form-control"
           type="number"
           :disabled="data.find(x => x.name === 'Disable').value"
           :placeholder="data.find(x => x.name === 'Placeholder').value"
           :value="data.find(x => x.name === 'Value').value">
  </div>
</template>

<script>
export default {
  name: "InputComponentTemplate",
  props: {
    data: {
      type:Array,
    }
  }
}
</script>


<style scoped src="@/bootstrap/bootstrap.css">

</style>