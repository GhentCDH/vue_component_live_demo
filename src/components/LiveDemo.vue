<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="live-demo">
    <div v-show="false"><slot></slot></div>
    <VueLivePreview
      class="preview"
      :code="innerCode"
      :components="components"
      @error="(e: any) => (error = e)"
      @success="error = undefined"
    />
    <VueLiveEditor
      v-if="displayEditor"
      :code="innerCode"
      :error="error"
      @change="updateCode"
    />
    <div class="display-editor-toggle" @click="toggleEditor">
      {{ displayEditor ? "Hide editor" : "Display Editor" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from "vue";
import { VueLivePreview, VueLiveEditor } from "vue-live";
import { VNodesToCode } from "./VNodesToCode";

const props = defineProps<{ code?: string; components?: Object }>();

const slots = useSlots();
let innerCode = ref(
  slots.default != null ? VNodesToCode(slots.default()) : props.code ?? ""
);
watch(
  () => props.code,
  () => {
    innerCode.value = props.code;
  }
);
const updateCode = function (newcode: string): void {
  innerCode.value = newcode;
};

let error = ref(undefined);

let displayEditor = ref(false);
const toggleEditor = function (): void {
  displayEditor.value = !displayEditor.value;
};
</script>
