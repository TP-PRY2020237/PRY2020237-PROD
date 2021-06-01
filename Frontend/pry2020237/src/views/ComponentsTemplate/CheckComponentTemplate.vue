<template>
  <div>
    <label>
      <input
          type="checkbox"
          :value="data.find(x => x.name === 'Value').value"
          :checked="data.find(x => x.name === 'Checked').value"
          :disabled="data.find(x => x.name === 'Disable').value"
          >
            {{ data.find(x => x.name === 'DisplayName').value }}
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckComponentTemplate",
  props: {
    data: {
      type:Array,
    }
  }
}
</script>


<style scoped src="@/bootstrap/bootstrap.css">

</style>