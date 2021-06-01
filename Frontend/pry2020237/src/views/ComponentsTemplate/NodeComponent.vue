<template>
  <div
    v-bind:elemnt="child.type"
    v-bind:class="[classNames()]"
    v-bind:style="styles()"
    v-bind:id="id()"
  >
    <div
      v-if="
        child.type === 'Element' && child.element.componentType.name == 'Text'
      "
      v-bind:style="{ height: '100%', width: '100%' }"
    >
      <TextComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-if="
        child.type === 'Element' &&
          child.element.componentType.name == 'Circle Image'
      "
      v-bind:style="{ height: '100%', width: '100%' }"
    >
      <ImageComponentTemplate
        :data="child.element.attributesJson.data"
        :classParam="'rounded-circle'"
      />
    </div>

    <div
      v-if="
        child.type === 'Element' &&
          child.element.componentType.name == 'Square Image'
      "
      v-bind:style="{ height: '100%', width: '100%' }"
    >
      <ImageComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-bind:style="{ height: '100%', width: '100%' }"
      v-if="
        child.type === 'Element' && child.element.componentType.name == 'Input'
      "
    >
      <InputComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-if="
        child.type === 'Element' &&
          child.element.componentType.name == 'Combo Box'
      "
    >
      <SelectComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-if="
        child.type === 'Element' &&
          child.element.componentType.name == 'Radio Button'
      "
    >
      <RadioComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-if="
        child.type === 'Element' &&
          child.element.componentType.name == 'CheckBox'
      "
    >
      <CheckComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-if="
        child.type === 'Element' && child.element.componentType.name == 'Button'
      "
      v-bind:style="{ height: '100%', width: '100%' }"
    >
      <ButtonComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-if="
        child.type === 'Element' &&
          child.element.componentType.name == 'Input Number'
      "
    >
      <InputNumberComponentTemplate :data="child.element.attributesJson.data" />
    </div>

    <div
      v-bind:style="{ height: '100%', width: '100%' }"
      v-if="
        child.type === 'Element' &&
          child.element.componentType.name == 'Text Area'
      "
    >
      <TextAreaComponentTemplate :data="child.element.attributesJson.data" />
    </div>
    <NodeComponent
      v-if="child.type !== 'Element'"
      :componentSelected="componentSelected"
      v-for="(c, i) in child.childrens"
      :key="i"
      :child="c"
    />
  </div>
</template>

<script
  type="application/javascript"
  src="@/controllers/Page/NodeComponent.js"
></script>

<style scoped src="@/bootstrap/bootstrap.css"></style>
