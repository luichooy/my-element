<template>
  <div
    class="radio-group"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'RadioGroup',
    
    componentName: 'RadioGroup',
    
    props: {
      value: {},
      disabled: Boolean,
      size: String,
      display: String,
      border: Boolean
    },
    
    computed: {
      radioGroupSize() {
        return this.size;
      }
    },
    
    created() {
      this.$on('handleChange', value => {
        this.$emit('change', value);
      });
    }
  };
</script>

<style lang="scss" scoped>
  .radio-group {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    font-size: 0;
  }
</style>
