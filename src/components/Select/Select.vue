<template>
  <div
    class="yto-select"
    :class="[selectSize ? 'yto-select--'+selectSize : '']"
    @click.stop="toggleMenu"
    v-clickout="handleClose"
  >
    <div
      class="yto-select__tags"
      v-if="multiple"
    >
    
    </div>
    <el-input
      ref="reference"
      :value="value"
      :name="name"
      :autocomplete="autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="true"
      :placeholder="currentPlaceholder"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose" :class="['el-input__icon', 'yto-select__caret', 'el-icon-' + iconClass]"></i>
        <i v-if="showClose" class="el-input__icon yto-select__caret el-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </el-input>
    <yto-select-menu
      v-show="visible && emptyText !== false"
      :append-to-body="popperAppendToBody"
      :popperClass="popperClass"
    >
      <el-scrollbar
        tag="ul"
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
        ref="scrollbar"
        v-show="options.length > 0 && !loading"
      >
        <!--<yto-option></yto-option>-->
        <slot></slot>
      </el-scrollbar>
      <p
        class="yto-select-dropdown__empty"
        v-if="emptyText"
      >
        {{ emptyText }}
      </p>
    </yto-select-menu>
  </div>
</template>

<script>
  import YtoOption from './Option';
  import YtoSelectMenu from './SelectMenu';
  import { valueEquals } from '@/utils/util';
  
  export default {
    name: 'YtoSelect',
    
    componentName: 'YtoSelect',
    
    provide() {
      return {
        'select': this
      };
    },
    
    components: {
      YtoOption,
      YtoSelectMenu
    },
    
    props: {
      value: {},
      name: String,
      autocomplete: {
        type: String,
        default: 'off'
      },
      size: String,
      multiple: Boolean,
      clearable: Boolean,
      disabled: Boolean, // 是否将弹出框插入到body元素，在弹出框的定位出现问题时，可将该属性设置为false
      popperAppendToBody: {
        type: Boolean,
        default: true
      },
      popperClass: String,
      placeholder: {
        type: String,
        default: '请选择'
      },
      noDataText: {
        type: String,
        default: '无数据'
      },
      loading: Boolean,
      loadingText: {
        type: String,
        default: '加载中'
      }
    },
    
    data() {
      return {
        options: [ 1 ],
        inputHovering: false,
        visible: false,
        inputWidth: 0,
        currentPlaceholder: ''
      };
    },
    
    computed: {
      selectSize() {
        return this.size;
      },
      
      selectDisabled() {
        return this.disabled;
      },
      
      showClose() {
        let criteria = this.clearable && !this.selectDisabled && this.inputHovering && !this.multiple && this.value !== null && this.value !== undefined && this.value !== '';
        return criteria;
      },
      
      iconClass() {
        return this.remote && this.filterable ? '' : (this.visible ? 'arrow-up is-reverse' : 'arrow-up');
      },
      
      emptyText() {
        if (this.loading) {
          return this.loadingDirective;
        } else {
          if (this.options.length === 0) {
            return this.noDataText;
          }
        }
        return null;
      }
    },
    
    watch: {
      placeholder(placeholder) {
        this.currentPlaceholder = placeholder;
      }
    },
    
    created() {
      this.currentPlaceholder = this.placeholder;
      this.$on('handleOptionClick', this.handleOptionSelect);
    },
    
    mounted() {
      const reference = this.$refs.reference;
      
      if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
        this.currentValue = '';
      }
      
      this.$nextTick(() => {
        if (reference && reference.$el) {
          this.inputWidth = reference.$el.getBoundingClientRect().width;
        }
      });
    },
    
    methods: {
      toggleMenu() {
        if (!this.selectDisabled) {
          this.visible = !this.visible;
          
          if (this.visible) {
            (this.$refs.input || this.$refs.reference).focus();
          }
        }
      },
      
      handleClose() {
        this.visible = false;
      },
      
      handleClearClick(event) {
        this.deleteSelected(event);
      },
      
      handleOptionSelect(option, byClick) {
        if (this.multiple) {
        
        } else {
          this.$emit('input', option.value);
          this.emitChange(option.value);
          this.visible = false;
        }
      },
      
      deleteSelected(event) {
        /*
         * 在清除选中值的情况下，阻止点击事件进一步传播
         * 在非清除选中值的情况下，需要传播出去，触发其它点击事件，比如select上面绑定的click事件
         * */
        event.stopPropagation();
        this.$emit('input', '');
        this.emitChange('');
        // 关闭dropdown
        this.visible = false;
        // 派发clear事件，对外提供接口
        this.$emit('clear');
      },
      
      emitChange(val) {
        if (!valueEquals(this.value, val)) {
          this.$emit('change', val);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .yto-select {
    position: relative;
    display: inline-block;
    
    .el-input {
      .yto-select__caret {
        color: #C0C4CC;
        font-size: 14px;
        cursor: pointer;
        transition: transform .3s;
        transform: rotateZ(180deg);
        
        &.is-reverse {
          transform: rotateZ(0);
        }
      }
    }
    
    .yto-select-dropdown__empty {
      padding: 10px 0;
      margin: 0;
      text-align: center;
      color: #999999;
      font-size: 14px;
    }
  }
</style>
