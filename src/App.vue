<template>
  <LiveDemo :code="test">
    <Paragraph
      :id="testId"
      :number="5"
      :lines="[{ id: '1', content: 'Content' }]"
      @click="test = '<div>something</div>'"
    />
  </LiveDemo>

  <LiveDemo :code="test">
    <span>Start <span>Inner</span> End</span>
  </LiveDemo>

  <div @click="change">Change</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LiveDemo } from "./VueComponentLiveDemo";
import { Paragraph } from "@ghentcdh/vue-component-text";

let test = ref("<div>Test</div>");
let testId = ref("TestId");

const change = function () {
  test.value = "<div>Change</div>";
};

const something = function () {};
</script>
