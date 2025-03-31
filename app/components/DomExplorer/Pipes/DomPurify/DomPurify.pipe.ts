import { z } from "zod";

export const hooksTemplate = `
function(domPurify){ 
  domPurify.removeAllHooks()
  // ...
}
`.trim();

const pipe = definePipe({
  name: "DomPurify",
  category: "Sanitizer",
  opts: z
    .object({
      version: z.string().catch("latest"),
      domBackend: z.string().catch("Browser"),
      options: z.string().catch("{}"),
      hooks: z.string().catch(hooksTemplate),
    })
    .catch(() => ({
      version: "latest",
      domBackend: "Browser",
      options: "{}",
      hooks: hooksTemplate,
    })),
});

export default pipe;
export type Opts = InferPipeOpts<typeof pipe>;
