var script = {
  name: 'VueFullAutocomplete',

  data() {
    return {
      loading: false,
      search: '',
      url_params: '',
      list: []
    };
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    keyItem: {
      type: String,
      required: false,
      default: 'username'
    },
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: false,
      default: 'GET'
    },
    params: {
      type: Object,
      required: false,
      default: () => {}
    },
    headers: {
      type: Object,
      required: false,
      default: () => {}
    },
    closeOnClick: {
      type: Boolean,
      required: false,
      default: true
    },
    closeOutsideClick: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    isPopup() {
      return this.visible;
    }

  },
  methods: {
    selectedItem(item) {
      this.$emit('selected', item);
      if (this.closeOnClick) this.removeEvents();
    },

    searchResults() {
      this.loading = true;
      this.list = []; // Create URL

      var url = new URL(this.url); // Merge URL Data with Query Data

      this.url_params = { ...this.params,
        ...{
          q: this.search
        }
      };
      url.search = new URLSearchParams(this.url_params).toString();
      fetch(url, {
        method: this.method,
        headers: this.headers
      }).then(res => res.json()).then(json => {
        this.loading = false;
        this.list = json;
      });
    },

    closeIfEsc(event) {
      if (!event.isTrusted || !this.closeOutsideClick) return;

      if (this.$el.contains(event.target)) {
        let bool = this.$el.childNodes[0].contains(event.target);
        if (!bool) this.removeEvents();
      }
    },

    removeEvents() {
      if (this.visible) {
        this.$emit('close', false);
      }
    }

  },
  created: function () {
    window.addEventListener('click', this.closeIfEsc);
  },
  beforeDestroy: function () {
    window.removeEventListener('click', this.closeIfEsc);
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.isPopup ? _c('div', {
    staticClass: "VueFullAutocomplete"
  }, [_c('div', {
    staticClass: "VueFullAutocompleteModal"
  }, [_c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search,
      expression: "search"
    }],
    attrs: {
      "id": "VueFullAutocompleteInput"
    },
    domProps: {
      "value": _vm.search
    },
    on: {
      "input": [function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.search = $event.target.value;
      }, function ($event) {
        return _vm.searchResults();
      }]
    }
  })]), _vm._v(" "), _vm.loading ? _vm._t("loading", function () {
    return [_c('div', {
      staticClass: "spinner"
    })];
  }) : _vm._e(), _vm._v(" "), _vm.list.length ? _c('transition-group', {
    attrs: {
      "name": "fade",
      "tag": "ul"
    }
  }, _vm._l(_vm.list, function (item, index) {
    return _c('a', {
      key: item[_vm.keyItem],
      staticClass: "action-item",
      attrs: {
        "type": "button",
        "data-index": index
      },
      on: {
        "click": function ($event) {
          return _vm.selectedItem(item);
        }
      }
    }, [_vm._t("listItem", function () {
      return [_c('li', {
        staticClass: "list-item"
      }, [_vm._v(_vm._s(item[_vm.keyItem]))])];
    }, {
      "item": item
    })], 2);
  }), 0) : _vm._e()], 2)]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-564a4ae5_0", {
    source: ".fade-enter-active[data-v-564a4ae5],.fade-leave-active[data-v-564a4ae5]{transition:opacity .5s}.fade-enter[data-v-564a4ae5],.fade-leave-active[data-v-564a4ae5],.fade-leave-to[data-v-564a4ae5]{opacity:0}.VueFullAutocomplete[data-v-564a4ae5]{width:100%;top:0;position:absolute;height:100%;background-color:rgba(0,0,0,.3)}.VueFullAutocompleteModal[data-v-564a4ae5]{position:fixed;bottom:0;width:100%;overflow-x:auto;height:calc(100% - 150px);background-color:#fff;border:1px solid #ccc;overflow:hidden;padding:10px;box-sizing:border-box}#VueFullAutocompleteInput[data-v-564a4ae5]{border:1px solid #ddd;width:calc(100% - 15px);padding:5px}.list-item[data-v-564a4ae5]{margin-top:5px}.spinner[data-v-564a4ae5]{height:60px;width:60px;position:absolute;top:50%;left:50%;margin:-30px 0 0 -30px;-webkit-animation:rotation-data-v-564a4ae5 1s infinite linear;-moz-animation:rotation-data-v-564a4ae5 1s infinite linear;-o-animation:rotation-data-v-564a4ae5 1s infinite linear;animation:rotation-data-v-564a4ae5 1s infinite linear;border:6px solid rgba(0,0,0,.2);border-radius:100%}.spinner[data-v-564a4ae5]:before{content:\"\";display:block;position:absolute;left:-6px;top:-6px;height:100%;width:100%;border-top:6px solid rgba(0,0,0,.8);border-left:6px solid transparent;border-bottom:6px solid transparent;border-right:6px solid transparent;border-radius:100%}@-webkit-keyframes rotation-data-v-564a4ae5{from{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(359deg)}}@-moz-keyframes rotation-data-v-564a4ae5{from{-moz-transform:rotate(0)}to{-moz-transform:rotate(359deg)}}@-o-keyframes rotation-data-v-564a4ae5{from{-o-transform:rotate(0)}to{-o-transform:rotate(359deg)}}@keyframes rotation-data-v-564a4ae5{from{transform:rotate(0)}to{transform:rotate(359deg)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-564a4ae5";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = component; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueFullAutocomplete', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
