import jsdom from "jsdom";
import DOMPurify from "dompurify";

const { JSDOM } = jsdom;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { dompurifyVersion, html } = JSON.parse(body);

  if (dompurifyVersion !== "3.2.3") return { "message": "Only DOMPurify 3.2.3 is currently supported" }

  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  return { "html": purify.sanitize(html) }
})