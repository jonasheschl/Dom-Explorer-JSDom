<template>
  <Pipe :pipe="pipe" :error="error">
    <template #description>
      Parse the input with
      <ExternalLink href="https://github.com/jsdom/jsdom" label="JSDom" />.
      Output the result as HTML.
    </template>
    <template #options>
      <PipeOption label="Version">
        <p>Select the version to use for JSDom.</p>
        <SearchInput
          v-model="pipe.opts.version"
          label="Version"
          :choices="versions"
        />
      </PipeOption>
    </template>
    <template #render>
      <RenderHtml :text="result" />
    </template>
  </Pipe>
</template>

<script lang="ts" setup>
import type { Pipe } from "~/types.js";
import type { Opts } from "./JSDom.pipe.js";

const props = defineProps<{
  input: string;
  pipe: Pipe<Opts>;
}>();

const emit = defineEmits<{
  update: [string];
}>();

const error = ref<string>();
const result = ref<string>("");

const versions = usePackageVersions("jsdom");

const parse = useSandbox(
  async (imp, version: string, input: string) => {
    // nuxt's $fetch is not available within the sandbox
    const response = await fetch("./api/jsdom", {
      "method": "POST",
      "body": JSON.stringify({
        "jsdomVersion": version,
        "html": input
      })
    });
    const json = await response.json();

    return json.html;
  },
);

watchEffect(() => {
  parse(props.pipe.opts.version, props.input)
    .then((parsed) => {
      result.value = parsed;
      error.value = "";
    })
    .catch((e) => {
      error.value = `${e}`;
      result.value = "";
    });
});

watchEffect(() => {
  emit("update", result.value);
});
</script>
