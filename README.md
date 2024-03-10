# Super Vue 3 Tabs Component

A Vue 3 component for creating tabbed interfaces easily.

![Super tabs demo](./public/demo.gif)
#### Try live demo [here](https://mdsaban.com). If you face any issue, please raise it [here](#).

## Installation
```bash
npm install vue3-tabs-component
```
or use yarn
```bash
yarn add vue3-tabs-component
```

## Usage
In your Vue 3 project, import the component where you need to use it:

```javascript
import { Tabs, Tab } from 'vue3-tabs-component';
```

**Tabs Component** - The Tabs component wraps your tab elements. It manages the state of the tabs and their content.

**Tab Component** - The Tab component represents each individual tab. It requires a title prop for the tab title and can contain any content.

```vue
<template>
  <Tabs>
    <Tab title="Tab 1">
      <p>This is the content of Tab 1</p>
    </Tab>
    <Tab :disabled="true" title="Tab 2">
      <p>This is the content of Tab 2</p>
    </Tab>
    <Tab title="Tab 2">
      <p>This is the content of Tab 2</p>
    </Tab>
  </Tabs>
</template>

<script setup>
import { Tabs, Tab } from 'vue3-tabs-component'
</script>
```

## Props

### Tabs Component
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| defaultTab | Number | 0 | The index of the tab to be displayed by default. |
| align | String | 'left' | The alignment of the tabs. Possible values: 'left', 'center', 'right' |


### Tab Component
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | String | - | The title of the tab. |
| disabled | Boolean | false | Whether the tab is disabled. |
| icon | String | - | The icon to be displayed next to the tab title. |
| iconPosition | String | 'left' | The position of the icon. Possible values: 'left', 'right' |


## Events

### Tabs Component

| Event | Description |
| --- | --- |
| change | Emitted when the active tab changes. The event payload is the index of the new active tab. |

### Tab Component

| Event | Description |
| --- | --- |
| click | Emitted when the tab is clicked. The event payload is the index of the tab. |

