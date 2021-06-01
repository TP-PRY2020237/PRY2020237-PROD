<template>
  <div>
    <button
        :data-url="data.find(x => x.name == 'Href').value"
        :class="'btn btn-' + data.find(x => x.name == 'BtnClass').value"
        style="color: white"
        v-if="(data.find(x => x.name == 'Href').value) != ''"
        onclick="function goTo(element){ window.open(element.dataset.url, '_parent');  };goTo(this)"
        :disabled="data.find(x => x.name == 'Disable').value"
        v-bind:style="{'width':'100%'}"
    >
      {{data.find(x => x.name == 'DisplayName').value}}
    </button>

    <button
        :class="'btn btn-' + data.find(x => x.name == 'BtnClass').value"
        v-if="(data.find(x => x.name === 'Href').value) == ''"
        style="color: white"
        :disabled="data.find(x => x.name == 'Disable').value"
            v-bind:style="{'width':'100%'}"
    >
            {{data.find(x => x.name == 'DisplayName').value}}
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonComponentTemplate",
  props: {
    data: {
      type:Array,
    }
  }
}
</script>

<style scoped src="@/bootstrap/bootstrap.css">

</style>

