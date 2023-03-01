import { VNode, VNodeProps } from "vue";

const PropValueToCode = function (value: any): string {
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
      renderedItems.push(PropValueToCode(item));
    });
    return `[${renderedItems.join(",")}]`;
  }
  if (typeof value === "object") {
    const renderedItems: string[] = [];
    for (const [k, v] of Object.entries(value)) {
      renderedItems.push(`${k}: ${PropValueToCode(v)}`);
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

const PropsToCode = function (
  props: VNodeProps,
  dynamicProps?: string[]
): string {
  const renderedProps: string[] = [];
  for (const [k, v] of Object.entries(props)) {
    if (k.substring(0, 2) === "on" && typeof v === "function") {
      renderedProps.push(
        `@${k.charAt(2).toLowerCase()}${k.substring(3)}="${PropValueToCode(v)}"`
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
    renderedProps.push(`:${k}="${PropValueToCode(v)}"`);
  }
  return renderedProps.join(" ");
};

const VNodeToCode = function (vnode: VNode): string {
  // __name is part of an internal interface (https://github.com/vuejs/core/blob/98f1934811d8c8774cd01d18fa36ea3ec68a0a54/packages/runtime-core/src/component.ts#L117)
  const tag: string =
    typeof vnode.type === "string" ? vnode.type : vnode.type.__name;
  if (vnode.type.toString() === "Symbol(Text)") {
    return (vnode.children as string).split(";").join(";\n");
  }
  // dynamicProps is marked as internal (https://github.com/vuejs/core/blob/98f1934811d8c8774cd01d18fa36ea3ec68a0a54/packages/runtime-core/src/vnode.ts#L199)
  const renderedProps =
    vnode.props == null
      ? ""
      : ` ${PropsToCode(vnode.props, vnode.dynamicProps)}`;
  if (vnode.children == null) {
    return `<${tag}${renderedProps}/>`;
  }
  if (typeof vnode.children === "string") {
    return `<${tag}${renderedProps}>${vnode.children}</${tag}>`;
  }
  return `<${tag}${renderedProps}>${VNodesToCode(
    vnode.children as VNode[]
  )}</${tag}>`;
};

export const VNodesToCode = function (vnodes: VNode[]): string {
  const renderedVnodes: string[] = [];
  vnodes.forEach((vnode) => {
    renderedVnodes.push(VNodeToCode(vnode));
  });
  return renderedVnodes.join("\n");
};
