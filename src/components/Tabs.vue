<script setup lang="ts">
// This css import is for getting tailwind css
import "../styles/styles.css";
import {
  onMounted,
  onUnmounted,
  provide,
  watch,
  ref,
  computed,
  ComponentPublicInstance,
  Ref,
} from "vue";
import { useElementVisibility } from "@vueuse/core";

interface Props {
  primaryColor?: string;
}
// TODO: extract to a separate file
interface Tab {
  id: string;
  value: string;
  disabled?: boolean;
  computedTabId?: string;
  icon?: any;
}

interface TabVisibility {
  [key: string]: Ref<boolean>;
}

const props = withDefaults(defineProps<Props>(), {
  primaryColor: "#3b82f6",
});

const emit = defineEmits<{
  (e: "change", tab: Tab): void;
}>();

const tabsContainerRef = ref<HTMLDivElement | null>(null);
const tabs = ref<Tab[]>([]);
const activeTab = ref<Tab>({ id: "", value: "" });
const activeTabValueVModel = defineModel({ default: "" });
const tabElems = ref<(ComponentPublicInstance | null | Element)[]>([]);
const tabsVisibility = ref<TabVisibility>({});
const showDropdown = ref(false);

const watchTabsVisibility = () => {
  for (let index in tabElems.value) {
    const isVisible = useElementVisibility(
      tabElems.value[index] as HTMLElement
    );
    tabsVisibility.value[tabs.value[index].id] = isVisible;
  }
};

const dropwDownList = computed(() => {
  return tabs.value.filter((tab: Tab) => !tabsVisibility.value[tab.id]);
});

const addTabs = (tab: Tab) => {
  tabs.value.push(tab);
};

provide("addTabs", addTabs);
provide("activeTab", activeTab);

watch(tabElems.value, watchTabsVisibility);

const scrollHorizontally = function (e: WheelEvent) {
  if (e.deltaY == 0 || !tabsContainerRef.value) return;
  e.preventDefault();
  tabsContainerRef.value.scrollLeft += e.deltaY;
};

const selectTab = ({ tab, tabValue }: { tab?: Tab; tabValue?: any }) => {
  if(!tab && tabValue) {
    tab = tabs.value.find((tab) => tab.value === tabValue);    
  }
  if(!tab) return
  showDropdown.value = false;
  const id = tab.id;
  const tabIndex = tabs.value.findIndex((tab) => tab.id === id);
  const elem: HTMLDivElement = tabElems.value[tabIndex] as HTMLDivElement;
  if (elem) {
    elem?.parentElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  activeTab.value = tab;
  activeTabValueVModel.value = tab.value;
  emit("change", tab);
};

onMounted(() => {
  tabsContainerRef.value?.addEventListener("wheel", scrollHorizontally);
  if (!tabs.value.length) return;
  if(activeTabValueVModel.value) return selectTab({ tabValue: activeTabValueVModel.value})
  selectTab({tab: tabs.value[0]});
});

onUnmounted(() => {
  tabsContainerRef.value?.removeEventListener("wheel", scrollHorizontally);
});
</script>

<template>
  <div class="super-vue3-tabs">
    <div class="flex gap-2">
      <!-- Tabs list -->
      <div class="flex gap-3 tabs" ref="tabsContainerRef">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :id="tab.id"
          class="relative flex items-center px-3 py-2 rounded-sm cursor-pointer min-w-max"
          :class="{
            'border-b-2': activeTab.id === tab.id,
            'opacity-50 !cursor-default': tab.disabled,
          }"
          :style="{
            color: activeTab.id === tab.id ? props.primaryColor : '',
            borderBottomColor:
              activeTab.id === tab.id ? props.primaryColor : '',
          }"
          @click="tab.disabled ? '' : selectTab({tab})"
        >
          <div
            class="absolute left-0 right-0 w-1 h-1 m-auto tracker-element"
            :ref="
              (el) => {
                tabElems[index] = el;
              }
            "
          ></div>
          <component
            v-if="tab.icon"
            v-for="(node, index) in tab.icon()"
            :key="index"
            :is="node"
          />
          {{ tab.value }}
        </div>
      </div>

      <!-- Dropdown -->
      <div v-if="dropwDownList.length" @mouseleave="showDropdown = false">
        <button class="w-6 h-full" @mouseover="showDropdown = true">
          <img src="@/assets/menu.svg" width="16" class="m-auto" />
        </button>
        <div class="dropdown" v-if="showDropdown">
          <div
            v-for="tab in dropwDownList"
            :key="tab.id"
            @click="selectTab({tab})"
            class="cursor-pointer"
          >
            <component
              v-if="tab.icon"
              v-for="(node, index) in tab.icon()"
              :key="index"
              :is="node"
            />
            {{ tab.value }}
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs Content -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
// make tabs scroll horizontally
.super-vue3-tabs {
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
}
</style>
