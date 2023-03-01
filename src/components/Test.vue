<template>
  <Paragraph
    :id="testId"
    :number="5"
    :lines="[{ id: '1', content: 'Content' }]"
    @click="test = '<div>something</div>'"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Paragraph } from "@ghentcdh/vue-component-text";

let test = ref("<div>Test</div>");
let testId = ref("TestId");
</script>
