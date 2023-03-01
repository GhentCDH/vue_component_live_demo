<template>
  <h2>Component</h2>
  <LiveDemo :components="{ Paragraph }">
    <Paragraph
      id="testId"
      :number="5"
      :lines="[{ id: '1', content: 'Content' }]"
      @click="test = '<div>something</div>'"
    />
  </LiveDemo>

  <h2>Html</h2>
  <LiveDemo>
    <span>Start <span>Inner</span> End</span>
  </LiveDemo>

  <h2>Prop</h2>
  <LiveDemo :code="test" />

  <div @click="change">Change</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LiveDemo } from "./VueComponentLiveDemo";
import { Paragraph } from "@ghentcdh/vue-component-text";

let test = ref("<div>Test</div>");

const change = function () {
  test.value = "<div>Change</div>";
};
</script>
