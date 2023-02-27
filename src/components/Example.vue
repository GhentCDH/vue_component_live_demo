<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="example">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import type { Message } from "../types";
const props = withDefaults(
  defineProps<{
    message?: Message;
  }>(),
  {
    message: "Hello world",
  }
);
</script>
