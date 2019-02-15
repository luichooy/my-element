import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
const nodeList = [];
const ctx = '@@clickoutContext';

const on = (function () {
  if (!isServer) {
    return function (element, event, handler) {
      if (element && event && handler) {
        if (document.addEventListener) {
          element.addEventListener(event, handler, false);
        } else {
          element.attachEvent('on' + event, handler);
        }
      }
    };
  }
})();

let startClick;
let seed = 0;

function createDocumentHandler(el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (!vnode || !vnode.context || !mouseup.target || !mousedown.target || el.contains(mouseup.target) || el.contains(mousedown.target) || el === mouseup.target) return;
    
    if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

!isServer && on(document, 'mousedown', e => (startClick = e));

!isServer && on(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});

export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bingdingFn: binding.value
    };
  },
  
  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bingdingFn = binding.value;
  },
  
  unbind(el) {
    let len = nodeList.length;
    
    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    
    delete el[ctx];
  }
};
