import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import InquiryForm from "./InquiryForm";
import { contacts } from "@/content/media";

jest.mock("react-router-dom", () => ({ useLocation: jest.fn() }), { virtual: true });

let container, root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  useLocation.mockReturnValue({ pathname: "/", search: "", hash: "" });
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  global.fetch = jest.fn();
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});
const renderForm = (props = {}) =>
  act(() =>
    root.render(
      <LanguageProvider>
        <InquiryForm {...props} />
      </LanguageProvider>,
    ),
  );
function enter(name, value) {
  const field = container.querySelector(`[name="${name}"]`);
  const prototype =
    field.tagName === "TEXTAREA"
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  act(() => {
    Object.getOwnPropertyDescriptor(prototype, "value").set.call(field, value);
    field.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
async function submit() {
  await act(async () => {
    container
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}
function fill() {
  enter("name", "Test Customer");
  enter("email", "customer@example.com");
  enter("message", "Actuator evaluation");
}

test("blank or malformed inquiries show localized validation without transmitting data", async () => {
  useLocation.mockReturnValue({ pathname: "/ja/", search: "", hash: "" });
  renderForm();
  await submit();
  expect(container.querySelector('[role="alert"]').textContent).toContain(
    "ご入力ください",
  );
  fill();
  enter("email", "invalid");
  await submit();
  expect(fetch).not.toHaveBeenCalled();
});
test("product inquiries preserve delivery configuration and show confirmed success", async () => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ success: "true" }),
  });
  renderForm({ product: { id: "roller-screw", name: "Planetary Roller Screws" }, intent: "custom" });
  expect(container.querySelector('[name="category"]').value).toBe("custom");
  fill();
  enter("timeline", "Pilot in six months");
  await submit();
  const [endpoint, request] = fetch.mock.calls[0];
  expect(endpoint).toBe(contacts.endpoint);
  expect(JSON.parse(request.body)).toMatchObject({
    product: "Planetary Roller Screws",
    inquiry_type: "custom",
    timeline: "Pilot in six months",
    category: "Discuss Custom Engineering",
    language: "en",
    _cc: contacts.cc,
    message: "Actuator evaluation",
  });
  expect(container.querySelector('[role="status"]').textContent).toContain(
    "received",
  );
  expect(container.querySelector('[name="name"]').value).toBe("");
});

test("Japanese partnership inquiries submit a stable intent with a localized category", async () => {
  useLocation.mockReturnValue({ pathname: "/ja/partnerships", search: "", hash: "" });
  fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
  renderForm({ intent: "coDevelopment" });
  expect(container.querySelector('[name="category"]').value).toBe("coDevelopment");
  expect(container.querySelector(".form-note a").getAttribute("href")).toBe("/ja/privacy");
  fill();
  await submit();
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
    inquiry_type: "coDevelopment",
    category: "共同開発を相談する",
    language: "ja",
    product: "",
  });
});
test.each(["network", "http", "provider"])(
  "a %s failure preserves the inquiry for retry",
  async (failure) => {
    if (failure === "network") fetch.mockRejectedValue(new Error("offline"));
    else
      fetch.mockResolvedValue({
        ok: failure !== "http",
        json: async () => ({ success: false }),
      });
    renderForm();
    fill();
    await submit();
    expect(container.querySelector('[role="alert"]').textContent).toContain(
      "could not send",
    );
    expect(container.querySelector('[name="message"]').value).toBe(
      "Actuator evaluation",
    );
    expect(container.querySelector('button[type="submit"]').disabled).toBe(
      false,
    );
  },
);
