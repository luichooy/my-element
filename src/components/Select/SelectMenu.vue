<template>
  <div
    :class="['yto-select-menu', { 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'YtoSelectMenu',
    
    componentName: 'YtoSelectMenu',
    
    props: {
      appendToBody: {
        type: Boolean,
        default: true
      },
      popperClass: String,
      placement: {
        type: String,
        default: 'bottom-start'
      },
      boundariesPadding: {
        type: Number,
        default: 0
      },
      popperOptions: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      visibleArrow: {
        default: true
      }
    },
    
    data() {
      return {
        minWidth: ''
      };
    },
    
    watch: {
      '$parent.inputWidth'() {
        this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
      }
    }
  };
</script>

<style scoped>
  .yto-select-menu {
    position: absolute;
    margin: 5px 0;
    box-sizing: border-box;
    border: 1px solid #E4E7ED;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    z-index: 1001;
  }
</style>
