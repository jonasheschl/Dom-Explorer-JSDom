import { JSDOM } from "jsdom";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { jsdomVersion, html } = JSON.parse(body);

  if (jsdomVersion !== "19.0.0") return { "message": "Only JSDOM 19.0.0 is currently supported" }

  const jsdomWindow = new JSDOM(html).window;

  return { "html": jsdomWindow.document.documentElement.innerHTML }
})