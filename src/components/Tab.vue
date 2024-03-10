<script setup lang="ts">
import { inject, onBeforeMount, computed, ref } from "vue";

interface Tab {
  id?: string;
  value: string;
  disabled?: boolean;
  computedTabId?: string;
}

const props = defineProps<{
  id?: string;
  value: string;
  disabled?: boolean;
}>();

const addTabs = inject("addTabs", (tab: Tab) => {console.log(tab)});
const activeTab = inject("activeTab", ref({id: '', value: ''}));

const computedTabId = computed(() => {
  return props.id || props.value.toLowerCase().replace(/ /g, "-") + '_' + Math.floor(Math.random() * 11)
}) 

const isActive = computed(() =>  activeTab?.value?.id === computedTabId.value);

onBeforeMount(() => {
    let tab = {...props}
    if(!tab.id) tab.id = computedTabId.value
    addTabs(tab);
});
</script>

<template>
  <div class="mt-4" v-show="isActive">
    <slot></slot>
  </div>
</template>
