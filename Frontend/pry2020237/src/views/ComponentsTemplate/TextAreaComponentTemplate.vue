<template>
  <div>
    <textarea
        style="resize: none;"
        class="form-control"
        :rows="data.find(x => x.name === 'Rows').value"
        :disabled="data.find(x => x.name === 'Disable').value"
        :placeholder="data.find(x => x.name === 'Placeholder').value">
          {{ data.find(x => x.name === 'Text').value }}
    </textarea>
  </div>
</template>

<script>
export default {
  name: "TextAreaComponentTemplate",
  props: {
    data: {
      type:Array,
    }
  }
}
</script>

<style scoped src="@/bootstrap/bootstrap.css">

</style>