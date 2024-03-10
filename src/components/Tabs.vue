<script setup lang="ts">
import { onMounted, onUnmounted, provide, watch, ref, computed, Prop } from "vue";
import { useElementVisibility } from "@vueuse/core";

interface Props {
  primaryColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  primaryColor: "#3b82f6",
});


const tabsContainerRef = ref<HTMLDivElement | null>(null);
const tabs = ref([]);
const activeTab = ref({});
const tabElems = ref([]);
const tabsVisibility = ref({});
const showDropdown = ref(false);

const watchTabsVisibility = () => {
  for (let index in tabElems.value) {
    tabsVisibility.value[tabs.value[index].id] = useElementVisibility(
      tabElems.value[index]
    );
  }
};

const dropwDownList = computed(() => {
  return tabs.value.filter((tab) => !tabsVisibility.value[tab.id]);
});

const addTabs = (tab) => {
  tabs.value.push(tab);
};

provide("addTabs", addTabs);
provide("activeTab", activeTab);

watch(tabElems.value, watchTabsVisibility);

const scrollHorizontally = function (e) {
  if (e.deltaY == 0 || !tabsContainerRef.value) return;
  e.preventDefault();
  tabsContainerRef.value.scrollLeft += e.deltaY;
};

const selectTab = (tab) => {
  showDropdown.value = false
  const id = tab.id;
  const tabIndex = tabs.value.findIndex((tab) => tab.id === id);
  const elem = tabElems.value[tabIndex]
  if (elem) {
    elem.parentElement.scrollIntoView({ behavior: "smooth",  block: 'nearest'})
  }
  
  activeTab.value = tab;
};

onMounted(() => {
  tabsContainerRef.value?.addEventListener("wheel", scrollHorizontally);
  if (!tabs.value.length) return;
  selectTab(tabs.value[0]);
});

onUnmounted(() => {
  tabsContainerRef.value?.removeEventListener("wheel", scrollHorizontally);
});
</script>

<template>
  <div>
    <div class="flex gap-2">  
      <div class="flex gap-3 tabs" ref="tabsContainerRef">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :id="tab.id"
          class="relative px-3 py-2 rounded-sm cursor-pointer min-w-max"
          :class="{
            'border-b-2': activeTab.id === tab.id,
            'opacity-50 !cursor-default': tab.disabled,
          }"
          :style="{
            color: activeTab.id === tab.id ? props.primaryColor : '',
            borderBottomColor: activeTab.id === tab.id ? props.primaryColor : '',
          }"
          @click="tab.disabled ? '' : selectTab(tab)"
        >
          <div
            class="absolute left-0 right-0 w-1 h-1 m-auto tracker-element"
            :ref="
              (el) => {
                tabElems[index] = el;
              }
            "
          ></div>
          {{ tab.value }}
        </div>
      </div>
      <div v-if="dropwDownList.length" @mouseleave="showDropdown = false">
        <button class="w-6 h-full" @mouseover="showDropdown = true ">
          <img src="@/assets/menu.svg" width="16" class="m-auto" />
        </button>
        <div class="dropdown" v-if="showDropdown">
          <div v-for="tab in dropwDownList" :key="tab.id" @click="selectTab(tab)" class="cursor-pointer">
            {{ tab.value }}
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
// make tabs scroll horizontally
.tabs {
  overflow-x: auto;
  user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.dropdown {
  position: absolute;
  background-color: #f8f8f8;
  min-width: 140px;
  max-height: 300px;
  overflow: auto;
  box-shadow: 0px 4px 20px -2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 8px;
  div {
    padding: 8px 12px;
    margin: 4px;
    text-decoration: none;
    display: block;
    &:hover {
      background-color: #f1f1f1;
      border-radius: 8px;
    }
  }
}
</style>
