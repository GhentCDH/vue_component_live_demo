<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="live-demo">
    <VueLivePreview
      class="preview"
      :code="code"
      @error="(e: any) => (error = e)"
      @success="error = undefined"
    />
    <VueLiveEditor
      v-if="displayEditor"
      :code="code"
      :error="error"
      @change="updateCode"
    />
    <div class="display-editor-toggle" @click="toggleEditor">
      {{ displayEditor ? "Hide editor" : "Display Editor" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VueLivePreview, VueLiveEditor } from "vue-live";

let code = ref("<div>Test</div>");
let displayEditor = ref(false);
let error = ref(undefined);

const updateCode = function (newcode: string): void {
  code.value = newcode;
};

const toggleEditor = function (): void {
  displayEditor.value = !displayEditor.value;
};
</script>
