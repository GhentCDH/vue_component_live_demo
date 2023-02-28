# Example

<!-- markdownlint-disable MD033 -->
<script setup>
import { LiveDemo } from "../../src/VueComponentLiveDemo";

const DefaultExample = `<Example />`
const OtherExample = `<Example message="Hello universe" />`
</script>

`LiveDemo` is a component to demo components.

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
