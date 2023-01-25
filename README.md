# Vue Full Autocomplete

> Vue Full Autocomplete component for Vue.js

[![npm](https://img.shields.io/badge/npm-1.0.3-blue)](https://www.npmjs.com/package/vue-full-autocomplete)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/codeeshop-oc/vue-full-autocomplete/blob/main/LICENSE)
[![bit](https://img.shields.io/badge/components-1-yellowgreen)](https://github.com/codeeshop-oc/vue-full-autocomplete/blob/main/src/VueFullAutocomplete.vue)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/codeeshop-oc/vue-full-autocomplete/issues?&q=is%3Aissue+is%3Aopen)

Vue Full Autocomplete provides feature of autocomplete with GET and POST request and listing the results

## 🎨 Features

Find out all available features on [settings props](https://github.com/codeeshop-oc/vue-full-autocomplete/blob/main/docs/API.md#props)

![til](https://raw.githubusercontent.com/codeeshop-oc/codeeshop-oc.github.io/master/vue-full-autocomplete/demo.gif)

## Live Demo

[Live Demo](https://codeeshop-oc.github.io/vue-full-autocomplete/)

## 🚚 Installation

### yarn/npm

```bash
# npm
npm i vue-full-autocomplete
# yarn
yarn add vue-full-autocomplete
```

### cdn

```bash
# latest
https://unpkg.com/vue-full-autocomplete
```

<br/>

## 🚀 Quick Start

```html
<template>
  <div>
      <button
        @click="visible = true; selected_item = {}"
      	>
      Open Popup</button>

     <VueFullAutocomplete
		    ref="VueFullAutocomplete"
		    :visible="visible"
		    @close="visible = false"
		    @selected="selected"
		    :headers="headers"
		    url="https://jsonplaceholder.typicode.com/users"
	    />
  </div>
</template>

<script>
  import VueFullAutocomplete from 'vue-full-autocomplete'

  export default {
    name: 'MyComponent',
    components: { VueFullAutocomplete },
    data() {
	    return {
	    	selected_item: {},
	        visible: false,
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }
	    }
	},
	methods: {
	    selected(item) {
	        this.selected_item = item
	        console.log(item, 'item')
	    }
    }
  }
</script>
```

<br/>

## 🔖 License

This software is licensed under the [MIT](https://github.com/codeeshop-oc/vue-full-autocomplete/blob/main/LICENSE).