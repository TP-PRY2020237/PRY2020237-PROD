<template>
  <div>
    <div
      class="container"
      v-bind:style="{ position: 'relative' }"
    >
      <div v-bind:id="id(child)" v-for="(child,i) in tree.root.childrens" :key="i">
        <NodeComponent   :child="child"  :componentSelected="componentSelected" />
      </div>
    </div>
  </div>
</template>

<script
  type="application/javascript"
  src="@/controllers/Page/RenderHTMLSectionBase.js"
></script>

<style scoped src="@/bootstrap/bootstrap-blue.min.css"></style>
