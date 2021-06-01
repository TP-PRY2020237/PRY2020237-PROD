<template>
  <div>
    <input class="form-control"
           type="text"
           :placeholder="data.find(x => x.name === 'PlaceHolder').value"
           :value="data.find(x => x.name === 'Value').value"
    >
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