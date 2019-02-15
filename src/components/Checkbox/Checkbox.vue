<template>
  <label
    class="checkbox"
    :class="[
      isBorder && checkboxSize ? 'checkbox-' + checkboxSize : '',
      !isBorder && {'is-block': isBlock},
      {'is-disabled': isDisabled},
      {'is-border': isBorder},
      {'is-checked': isChecked}
    ]"
    role="checkbox"
    :aria-checkbox="indeterminate ? 'mixed' : isChecked"
    :aria-disable="isDisabled"
    :id="id"
  >
    <span
      class="checkbox-input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate
      }"
    >
      <span class="checkbox-input__inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        type="checkbox"
        class="checkbox-input__original"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        :true-label="trueLabel"
        :false-label="trueLabel"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
      <input
        v-else
        type="checkbox"
        class="checkbox-input__original"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        :value="label"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span class="checkbox-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  import Emitter from '@/mixins/emitter';
  
  export default {
    name: 'Checkbox',
    
    componentName: 'Checkbox',
    
    mixins: [ Emitter ],
    
    props: {
      label: {},
      value: {},
      trueLabel: [ String, Number ],
      falseLabel: [ String, Number ],
      size: String,
      indeterminate: Boolean,
      id: String /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */,
      border: Boolean,
      disabled: Boolean,
      name: String
    },
    
    data() {
      return {
        selfModel: false,
        focus: false,
        isLimitExceeded: false
      };
    },
    
    computed: {
      isGroup() {
        let parent = this.$parent;
        
        while (parent) {
          if (parent.$options.componentName !== 'CheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        
        return false;
      },
      
      model: {
        get() {
          return this.isGroup ? this._checkboxGroup.value || this.value : this.value !== undefined
            ? this.value
            : this.selfModel;
        },
        
        set(val) {
          if (this.isGroup) {
            this.isLimitExceeded = false;
            this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);
            
            this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);
            
            this.isLimitExceeded === false && this.dispatch('CheckboxGroup', 'input', [ val ]);
          } else {
            this.$emit('input', val);
            this.selfModel = val;
          }
        }
      },
      
      checkboxSize() {
        return this.isGroup ? this._checkboxGroup.size || this.size : this.size;
      },
      
      isBlock() {
        return this.isGroup ? this._checkboxGroup.block || this.block : this.block;
      },
      
      isDisabled() {
        return this.isGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled;
      },
      
      isChecked() {
        // 仔细研究
        if ({}.toString.call(this.model) === '[object Boolean]') {
          // 如果this.model是布尔值
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },
      
      isBorder() {
        return this.isGroup ? this._checkboxGroup.border || this.border : this.border;
      }
    },
    
    methods: {
      handleChange(ev) {
        if (this.isLimitExceeded) return;
        let value;
        if (ev.target.checked) {
          value = this.trueLabel === undefined ? true : this.trueLabel;
        } else {
          value = this.falseLabel === undefined ? false : this.falseLabel;
        }
        this.$emit('change', value, ev);
        this.$nextTick(() => {
          if (this.isGroup) {
            this.dispatch('CheckboxGroup', 'change', [ this._checkboxGroup.value ]);
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .checkbox {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: #606266;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    
    & + & {
      margin-left: 30px;
    }
    
    &.is-block {
      display: block;
      margin: 16px 0;
    }
    
    &.is-checked {
      .checkbox-label {
        color: #409EFF;
      }
    }
    
    &.is-disabled {
      .checkbox-label {
        color: #C0C4CC;
        cursor: not-allowed;
      }
    }
    
    &.is-border {
      padding: 9px 20px 9px 10px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      box-sizing: border-box;
      line-height: normal;
      height: 40px;
      
      & + & {
        margin-left: 10px;
      }
      
      &.is-checked {
        border-color: #409EFF;
      }
    }
    
    &.checkbox-medium {
      padding: 7px 20px 7px 10px;
      border-radius: 4px;
      height: 36px;
    }
    
    &.checkbox-small {
      padding: 5px 15px 5px 10px;
      border-radius: 3px;
      height: 32px;
    }
    
    &.checkbox-mini {
      padding: 3px 15px 3px 10px;
      border-radius: 3px;
      height: 28px;
    }
    
    .checkbox-input {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      
      &.is-checked {
        .checkbox-input__inner {
          border-color: #409EFF;
          background-color: #409EFF;
          
          &::after {
            transform: rotate(45deg) scaleY(1);
          }
        }
      }
      
      &.is-disabled {
        .checkbox-input__inner {
          background-color: #EDF2FC;
          border-color: #DCDFE6;
          cursor: not-allowed;
          
          &::after {
            cursor: not-allowed;
            border-color: #C0C4CC;
          }
          
          &:hover {
            border-color: #DCDFE6;
          }
        }
      }
      
      .checkbox-input__inner {
        position: relative;
        display: inline-block;
        width: 14px;
        height: 14px;
        box-sizing: border-box;
        border: 1px solid #DCDFE6;
        border-radius: 2px;
        background-color: #FFFFFF;
        z-index: 1;
        transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
        
        &::after {
          position: absolute;
          left: 4px;
          top: 1px;
          content: "";
          width: 3px;
          height: 7px;
          border: 1px solid #FFFFFF;
          border-left: 0;
          border-top: 0;
          transform: rotate(45deg) scaleY(0);
          transform-origin: center;
          transition: transform 0.15s ease-in 0.05s;
        }
        
        &:hover {
          border-color: #409EFF;
        }
      }
      
      .checkbox-input__original {
        position: absolute;
        width: 0;
        height: 0;
        margin: 0;
        opacity: 0;
        z-index: -1;
        outline: none;
      }
    }
    
    .checkbox-label {
      display: inline-block;
      padding-left: 10px;
      line-height: 19px;
      font-size: 14px;
    }
  }
</style>
