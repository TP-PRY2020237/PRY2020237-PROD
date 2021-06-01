<template>
  <div>
    <div v-if="!editableState">
      <div
        v-bind:class="classNames()"
        v-bind:style="styles()"
        v-if="child.type === 'Element'"
        v-on:click="parent(child)"
        v-bind:id="idComponentLefSide()"
      >
        <p>
          {{ GetTextInSpanish(child.element.componentType.name) }}
        </p>
      </div>
      <div v-if="child.childrens.length > 0">
        <EditPageSidebarMenu
          v-for="(c, i) in child.childrens"
          :key="i"
          :child="c"
          :componentSelected="componentSelected"
          v-on:select-component="parent($event)"
        />
      </div>
    </div>
    <div class="list" v-if="editableState">
      <div
        v-if="isChildContainerOpen && isChildrensHasElementsChildrens()"
        v-bind:style="stylesLinesIndicators()"
        class="line-level"
      ></div>
      <div
        v-if="isChildContainerOpen && !isChildrensHasElementsChildrens()"
        v-bind:style="stylesLinesIndicators()"
        class="line-level-component"
      ></div>
      <div
        v-if="!isFirstLevel()"
        v-bind:style="stylesLeftLinesIndicators()"
        class="left-line-level"
      ></div>
      <div
        v-bind:class="classNames()"
        v-bind:style="styles()"
        v-if="editableState"
      >
        <div class="d-flex justify-space-between align-center">
          <p v-if="child.type !== 'Element'">{{ distributionType() }}</p>

          <v-icon v-on:click="showDropDown" v-if="child.type !== 'Element'">{{
            iconDropdown
          }}</v-icon>
        </div>

        <div v-if="child.type === 'Element' && !child.isDeletable">
          <p>
            {{ GetTextInSpanish(child.element.componentType.name) }}
          </p>
        </div>

        <div
          class="item-deletable"
          v-if="child.type === 'Element' && child.isDeletable"
        >
          <p style="margin: 0px">
            {{ GetTextInSpanish(child.element.componentType.name) }}
          </p>
          <button v-on:click="removeElement">
            <v-icon>delete</v-icon>
          </button>
        </div>
      </div>

      <div v-if="child.childrens.length > 0 && isChildContainerOpen">
        <EditPageSidebarMenu
          v-for="(c, i) in child.childrens"
          :key="i"
          :child="c"
          :componentSelected="componentSelected"
          v-on:select-component="parent($event)"
          :editableState="editableState"
          :tree="tree"
          :componentDataDictionary="componentDataDictionary"
        />
        <div
          v-bind:style="stylesButton()"
          v-if="isChildrensHasElementsChildrens()"
        >
          <button
            v-if="isShowingElementButton"
            class="button-add-element"
            v-on:click="openSelectElement"
          >
            Añadir Elemento
          </button>
          <v-container v-if="!isShowingElementButton">
            <v-row>
              <v-col style="padding: 0px" cols="12">
                <v-select
                  v-on:change="selectElement"
                  :items="components"
                  label="Standard"
                ></v-select>
              </v-col>
              <v-col style="padding: 0px" cols="6">
                <button class="new-element-button" v-on:click="addElement">
                  Guardar
                </button>
              </v-col>
              <v-col style="padding: 0px" cols="6">
                <button
                  class="cancel-element-button"
                  v-on:click="cancelAddElement"
                >
                  Cancelar
                </button>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script
  type="application/javascript"
  src="@/controllers/EditPage/SidebarMenuBase.js"
></script>

<style scoped>
.item-deletable {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item {
  width: 100%;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}
.list {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.line-level {
  width: 0px;
  border-left: 1px dashed #484848;
  height: 100%;
  position: absolute;
  top: 36px;
  left: 10px;
}

.line-level-component {
  width: 0px;
  border-left: 1px dashed #484848;
  height: 33%;
  position: absolute;
  top: 36px;
  left: 10px;
}

.left-line-level {
  width: 6px;
  border-bottom: 1px dashed #484848;
  height: 0%;
  position: absolute;
  top: 19px;
}

.item:hover {
  background: #1976d2 !important;
  color: #ffffff !important;
}
.cont {
  padding: 0px !important;
}

.item p {
  margin-bottom: 0px !important;
}

.new-element-button {
  margin: 0;
  padding: 8px;
  background: cornflowerblue;
  color: #fafafa;
}

.cancel-element-button {
  padding: 8px;
}

.button-add-element {
  margin-top: 4px;
  border-radius: 4px;
  border: 1px dashed #deedde;
  background: #fafafa;
  padding: 8px;
  transition: all 0.2s ease-in-out;
}
.button-add-element:hover {
  background: #efefef;
}
</style>
