<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="live-demo">
    <slot></slot>
    <VueLivePreview
      class="preview"
      :code="innerCode"
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
import { ref, watch, useSlots, VNode, VNodeProps, VNodeRef, h } from "vue";
import { VueLivePreview, VueLiveEditor } from "vue-live";

const props = defineProps<{ code: string }>();
let innerCode = ref(props.code);
watch(
  () => props.code,
  () => {
    innerCode.value = props.code;
  }
);

const slots = useSlots();

// console.log(slots.default()[0]);

let displayEditor = ref(false);
let error = ref(undefined);

const renderPropValue = function (value: any): string {
  if (typeof value === "string") {
    return `'${value}'`;
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (typeof value === "boolean") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    const renderedItems: string[] = [];
    value.forEach((item) => {
      renderedItems.push(renderPropValue(item));
    });
    return `[${renderedItems.join(",")}]`;
  }
  if (typeof value === "object") {
    const renderedItems: string[] = [];
    for (const [k, v] of Object.entries(value)) {
      renderedItems.push(`${k}: ${renderPropValue(v)}`);
    }
    return `{${renderedItems.join(",")}}`;
  }
  if (typeof value === "function") {
    if (value.name === "") {
      return value.toString().substring(19).replaceAll('"', "'");
    }
    return value.name;
  }
  console.error("Unknown prop value type");
  console.error(value);
};

const renderProps = function (
  props: VNodeProps,
  dynamicProps?: string[]
): string {
  const renderedProps: string[] = [];
  for (const [k, v] of Object.entries(props)) {
    if (k.substring(0, 2) === "on" && typeof v === "function") {
      renderedProps.push(
        `@${k.charAt(2).toLowerCase()}${k.substring(3)}="${renderPropValue(v)}"`
      );
      continue;
    }
    if (dynamicProps != null && dynamicProps.includes(k)) {
      renderedProps.push(`:${k}="${v as string}"`);
      continue;
    }
    if (typeof v === "string") {
      renderedProps.push(`${k}="${v as string}"`);
    }
    renderedProps.push(`:${k}="${renderPropValue(v)}"`);
  }
  return renderedProps.join(" ");
};

const renderVNode = function (vnode: VNode): string {
  const tag: string =
    typeof vnode.type === "string" ? vnode.type : vnode.type.__name;
  if (vnode.type.toString() === "Symbol(Text)") {
    return vnode.children as string;
  }
  const renderedProps =
    vnode.props == null
      ? ""
      : ` ${renderProps(vnode.props, vnode.dynamicProps)}`;
  if (vnode.children == null) {
    return `<${tag}${renderedProps}/>`;
  }
  if (typeof vnode.children === "string") {
    return `<${tag}${renderedProps}>${vnode.children}</${tag}>`;
  }
  return `<${tag}${renderedProps}>${renderVNodes(vnode.children)}</${tag}>`;
};

const renderVNodes = function (vnodes: VNode[]): string {
  const renderedVnodes: string[] = [];
  vnodes.forEach((vnode) => {
    renderedVnodes.push(renderVNode(vnode));
  });
  return renderedVnodes.join(" ");
};

console.log(renderVNodes(slots.default()));

const updateCode = function (newcode: string): void {
  innerCode.value = newcode;
};

const toggleEditor = function (): void {
  displayEditor.value = !displayEditor.value;
};
</script>
