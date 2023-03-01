import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { LiveDemo } from "..";

describe("Message", () => {
  const createWrapper = () => {
    return mount(LiveDemo);
  };

  it("should display the default message correctly", () => {
    const wrapper = createWrapper();
    const headers = wrapper.findAll("div");
    expect(headers.length).toBe(1);
    expect(headers[0].text()).toBe("Hello world");
  });
});
