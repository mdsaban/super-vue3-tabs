<script setup lang="ts">
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import { ref } from "vue";

// TODO: extract to a separate file
interface Tab {
  id: string;
  value: string;
  disabled?: boolean;
  computedTabId?: string;
}

const activeTab = ref("Tab 2");

const tabChanged = (tab: Tab) => {
  console.log('tab changed', tab);
};

</script>

<template>
  <div style="margin: 0 auto; max-width: 800px">
    <h1 style="margin-top: 30px">This is tab component</h1>
    <div style="margin-bottom: 30px">
      Welcome to Vue Tabs Component library. It helps you to create tabs
      easily. You can create horizontal and vertical tabs with this library.
    </div>

    
    <h1 class="mb-4 text-xl font-semibold">Demo 1</h1>
    <div class="p-4 bg-white border rounded-lg">
      <Tabs @change="tabChanged" v-model="activeTab">
        <Tab
          v-for="index in 16"
          :key="index"
          :value="`Tab ${index}`"
          :disabled="index === 3"
        >
          <div class="mb-1 text-xl">This is tab content {{ index }}</div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis quo
          iste voluptate repudiandae neque consequuntur accusamus tempora et nemo
          doloremque est exercitationem, ut quis suscipit labore atque placeat at
          soluta!
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<style>
body {
  /* background-color: #e1e1e1; */
}
html {
  scroll-behavior: smooth;
}
</style>
