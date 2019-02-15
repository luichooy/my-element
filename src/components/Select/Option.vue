<template>
  <li
    :class="[
      'yto-select-dropdown__item',
      {'is-disabled': disabled || groupDisabled},
      {'selected': itemSelected},
      {'hover': hover}
     ]"
    @click.stop="selectOptionClick"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script>
  import Emitter from '@/mixins/emitter';
  import { getValueByPath } from '@/utils/util';
  
  export default {
    name: 'YtoOption',
    
    componentName: 'YtoOption',
    
    mixins: [ Emitter ],
    
    inject: [ 'select' ],
    
    props: {
      disabled: Boolean,
      value: {
        required: true
      },
      label: [ String, Number ]
    },
    
    data() {
      return {
        hover: false,
        groupDisabled: false
      };
    },
    
    computed: {
      isObject() {
        return Object.prototype.toString.call(this.value)
                     .toLowerCase() === '[object object]';
      },
      
      currentLabel() {
        return this.label || (this.isObject ? '' : this.value);
      },
      
      currentValue() {
        return this.value || this.label || '';
      },
      
      itemSelected() {
        if (this.select.multiple) {
          return this.contains(this.select.value, this.value);
        } else {
          return this.isEqual(this.select.value, this.value);
        }
      }
    },
    
    created() {
      this.select.options.push(this);
      
      this.$on('handleGroupDisabled', this.handleGroupDisabled);
    },
    
    methods: {
      isEqual(a, b) {
        if (this.isObject) {
          const valueKey = this.select.valueKey;
          // return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
          
          return a[ valueKey ] === b[ valueKey ];
        } else {
          return a === b;
        }
      },
      
      contains(origin, target) {
        if (this.isObject) {
          const valueKey = this.select.valueKey;
          return origin.some(item => {
            return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
          });
        } else {
          return origin.indexOf(target) > -1;
        }
      },
      
      handleGroupDisabled(val) {
        this.groupDisabled = val;
      },
      
      selectOptionClick() {
        if (!this.disabled) {
          this.dispatch('YtoSelect', 'handleOptionClick', [ this, true ]);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .yto-select-dropdown__item {
    position: relative;
    padding: 0 20px;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    color: #606266;
    
    &:hover {
      background-color: #F5F7FA;
    }
    
    &.is-disabled {
      color: #C0C4CC;
      cursor: not-allowed;
    }
    
    &.selected {
      color: #409EFF;
      font-weight: 700;
    }
  }
</style>
