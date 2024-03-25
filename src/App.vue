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
  console.log('tab changed');
};

</script>

<template>
  <div style="margin: 0 auto; max-width: 800px">
  {{ activeTab }}
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

    <h1 class="mb-4 text-xl font-semibold mt-14">With Icon</h1>
    <div class="p-4 bg-white border rounded-lg">
      <Tabs @change="tabChanged">
        <Tab value="Tab 1">
          <template #icon>
            <svg class="w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/></svg>
          </template>
          This is tab 1
        </Tab>
        <Tab value="Tab 2">
          <template #icon>
            <svg class="w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/><path d="m12 15 5 6H7Z"/></svg>
          </template>
          This is tab 2
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
