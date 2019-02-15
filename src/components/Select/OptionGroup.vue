<template>
  <ul class="yto-select-group__wrap">
    <li class="yto-select-group__title">{{ label }}</li>
    <li>
      <ul class="yto-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
  import Emitter from '@/mixins/emitter';
  
  export default {
    name: 'YtoOptionGroup',
    
    componentName: 'YtoOptionGroup',
    
    mixins: [ Emitter ],
    
    props: {
      label: String,
      disabled: Boolean
    },
    
    watch: {
      disabled(value) {
        this.broadcast('YtoOption', 'handleGroupDisabled', value);
      }
    },
    
    mounted() {
      if (this.disabled) {
        this.broadcase('YtoOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .yto-select-group__wrap {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    
    &:not(:last-of-type) {
      padding-bottom: 24px;
      
      &:after {
        position: absolute;
        display: block;
        left: 20px;
        right: 20px;
        bottom: 12px;
        height: 1px;
        background-color: #E4E7ED;
        content: '';
      }
    }
    
    .yto-select-group__title {
      padding-left: 20px;
      font-size: 12px;
      color: #909399;
      line-height: 30px;
    }
    
    .yto-select-group {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
</style>
