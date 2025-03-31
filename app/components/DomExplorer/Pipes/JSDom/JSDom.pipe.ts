import { z } from "zod";

const pipe = definePipe({
  name: "JSDom",
  category: "Parser",
  opts: z
    .object({
      version: z.string().catch("latest"),
    })
    .catch(() => ({
      version: "latest",
    })),
});

export default pipe;
export type Opts = InferPipeOpts<typeof pipe>;
