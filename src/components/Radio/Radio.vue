<template>
  <label
    class="radio"
    :class="[
      isBorder && radioSize ? 'radio--' + radioSize : '',
      !isBorder && {'is-block': isBlock},
      {'is-border': isBorder},
      {'is-disabled': isDisabled},
      {'is-checked': model === label}
    ]"
    role="radio"
    :aria-disabled="isDisabled"
    :aria-checked="model === label"
  >
    <span
      class="radio-input"
      :class="[
        {'is-disabled': isDisabled},
        {'is-checked': model === label}
      ]"
    >
      <span class="radio-input__inner"></span>
      <input
        type="radio"
        class="radio-input__original"
        :value="label"
        :name="name"
        v-model="model"
        :disabled="isDisabled"
        @focus="focus=true"
        @blur="focus=false"
        @change="handleChange"
        aria-hidden="true"
      >
    </span>
    <span class="radio-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  import Emitter from '@/mixins/emitter';
  
  export default {
    name: 'Radio',
    
    componentName: 'Radio',
    
    mixins: [ Emitter ],
    
    props: {
      label: {},
      value: {},
      block: Boolean,
      size: String,
      border: Boolean,
      name: String,
      display: String
    },
    data() {
      return {
        focus: false
      };
    },
    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'RadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        
        return false;
      },
      
      model: {
        get() {
          // 获取v-model的值
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(val) {
          // v-model 双向绑定
          if (this.isGroup) {
            this.dispatch('RadioGroup', 'input', [ val ]);
          } else {
            this.$emit('input', val);
          }
        }
      },
      
      isBlock() {
        return this.isGroup ? this._radioGroup.block || this.block : this.block;
      },
      
      isDisabled() {
        return this.isGroup ? this._radioGroup.disabled || this.disabled : this.disabled;
      },
      
      isBorder() {
        return this.isGroup ? this._radioGroup.border || this.border : this.border;
      },
      
      radioSize() {
        return this.isGroup ? this._radioGroup.radioGroupSize || this.size : this.size;
      }
    },
    
    methods: {
      handleChange() {
        this.$nextTick(() => {
          // 派发change事件
          this.$emit('change', this.model);
          this.isGroup && this.dispatch('RadioGroup', 'handleChange', [ this.model ]);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .radio {
    position: relative;
    display: inline-block;
    line-height: 1;
    outline: none;
    white-space: nowrap;
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    
    & + & {
      margin-left: 30px;
    }
    
    &.is-block {
      display: block;
      margin: 16px 0;
    }
    
    &.is-disabled {
      .radio-label {
        color: #C0C4CC;
        cursor: not-allowed;
      }
    }
    
    &.is-border {
      padding: 12px 20px 0 10px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      box-sizing: border-box;
      height: 40px;
      
      & + & {
        margin-left: 10px;
      }
      
      &.is-checked {
        border-color: #409EFF;
      }
    }
    
    &.radio--medium {
      padding: 10px 20px 0 10px;
      border-radius: 4px;
      height: 36px;
    }
    
    &.radio--small {
      padding: 8px 15px 0 10px;
      border-radius: 3px;
      height: 32px;
    }
    
    &.radio--mini {
      padding: 6px 15px 0 10px;
      border-radius: 3px;
      height: 28px;
    }
    
    &.is-checked {
      .radio-label {
        color: #409EFF;
      }
    }
    
    .radio-input {
      position: relative;
      line-height: 1;
      vertical-align: middle;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      
      &.is-checked {
        .radio-input__inner {
          border-color: #409EFF;
          background-color: #409EFF;
        }
      }
      
      &.is-disabled {
        .radio-input__inner {
          background-color: #F5F7FA;
          border-color: #E4E7ED;
          cursor: not-allowed;
          
          &:hover {
            border-color: #E4E7ED;
          }
        }
        
        &.is-checked {
          .radio-input__inner::after {
            background-color: #C0C4CC;
          }
        }
      }
      
      .radio-input__inner {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 14px;
        height: 14px;
        border: 1px solid #DCDFE6;
        border-radius: 100%;
        box-sizing: border-box;
        cursor: pointer;
        background-color: #FFFFFF;
        
        &:hover {
          border-color: #409EFF;
        }
        
        &::after {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #FFFFFF;
          content: "";
          transform: translate(-50%, -50%);
          transition: transform 0.15s ease-in;
        }
      }
      
      .radio-input__original {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0;
        opacity: 0;
        z-index: -1;
        outline: none;
      }
    }
    
    .radio-label {
      padding-left: 10px;
      font-size: 14px;
    }
  }
</style>
