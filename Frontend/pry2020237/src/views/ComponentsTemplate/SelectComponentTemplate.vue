<template>
  <div>
    <select
        class="custom-select"
        :name="data.find(x => x.name === 'Name').value"
        :disabled="data.find(x => x.name === 'Disable').value">

      <option value="" :selected="data.find(x => x.name === 'Options').value == ''"> {{data.find(x => x.name === 'DisplayName').value}}</option>
          <option v-for="item in data.find(x => x.name === 'Options').items"
                  :value="data.find(x => x.name === 'Options').value"
                  :selected="data.find(x => x.name === 'Options').value == item"
                  :key="item">
            {{ item }}
          </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectComponentTemplate",
  props: {
    data: {
      type:Array,
    }
  }
}
</script>

<style scoped src="@/bootstrap/bootstrap.css">

</style>