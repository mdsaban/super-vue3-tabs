<script setup lang="ts">
import '../styles/styles.css';
import { inject, onBeforeMount, computed, ref, useSlots } from "vue";

interface Tab {
  id?: string;
  value: string;
  disabled?: boolean;
  computedTabId?: string;
  icon?: any
}

const props = defineProps<{
  id?: string;
  value: string;
  disabled?: boolean;
}>();

const tabDetail = ref({} as Tab);

const addTabs = inject("addTabs", (tab: Tab) => {console.log(tab)});
const activeTab = inject("activeTab", ref({id: '', value: ''}));

const computedTabId = computed(() => {
  return props.id || props.value.toLowerCase().replace(/ /g, "-") + '_' + Math.floor(Math.random() * 11)
}) 

const isActive = computed(() =>  activeTab?.value?.id === computedTabId.value);
const slots = useSlots()

onBeforeMount(() => {
    let tab = {...props, icon: slots?.icon}
    if(!tab.id) tab.id = computedTabId.value
    tabDetail.value = tab
    addTabs(tab);
});
</script>

<template>
  <div class="mt-4" v-show="isActive">
    <slot></slot>
  </div>
</template>
