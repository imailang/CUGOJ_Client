<template>
  <CUGMarkdown :code="code" :is-edit="false"></CUGMarkdown>
  <CUGMarkdown :code="code" :is-edit="true"></CUGMarkdown>
  <CUGCode :code="code" :language="'c++'"></CUGCode>
</template>

<script setup>
import CUGMarkdown from "@/components/CUGMarkdown";
import {ref} from "vue";
import CUGCode from "@/components/CUGCode";

const code = ref(
    '#include<iostream>\nusing namespace std;\nint main(){\n    cout<<"hello";\n}'
);

</script>

<style scoped>

</style>