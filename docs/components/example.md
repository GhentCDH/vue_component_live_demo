# Example

<!-- markdownlint-disable MD033 -->
<script setup>
import { VueLive } from "vue-live";
import { Example } from "../../src/VueComponentTemplate";
import "../vue-live.scss";

const DefaultExample = `<Example />`
const OtherExample = `<Example message="Hello universe" />`
</script>

`Example` is a component to display a message.

## Message

By default, the message `Hello World` is displayed.

<VueLive
  :code="DefaultExample"
  :components="{ Example }"
/>

The message can be changed by setting the `message` prop. Allowed values are `Hello world` and `Hello universe`.

<VueLive
  :code="OtherExample"
  :components="{ Example }"
/>

## Reference

### Properties

| Property | Type                              | Default       | Description        |
| -------- | --------------------------------- | ------------- | ------------------ |
| message  | "Hello world" \| "Hello universe" | "Hello world" | Message to display |
