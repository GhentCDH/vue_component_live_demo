import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { Example } from "..";

describe("Message", () => {
  const createDefaultWrapper = () => {
    return mount(Example);
  };

  it("should display the default message correctly", () => {
    const wrapper = createDefaultWrapper();
    const headers = wrapper.findAll("div");
    expect(headers.length).toBe(1);
    expect(headers[0].text()).toBe("Hello world");
  });

  const createOtherWrapper = () => {
    return mount(Example, { props: { message: "Hello universe" } });
  };

  it("should display another message correctly", () => {
    const wrapper = createOtherWrapper();
    const headers = wrapper.findAll("div");
    expect(headers.length).toBe(1);
    expect(headers[0].text()).toBe("Hello universe");
  });
});
