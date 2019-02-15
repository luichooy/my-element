<template>
  <div class="checkbox-group" role="checkboxgroup">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CheckboxGroup',
    
    componentName: 'CheckboxGroup',
    
    props: {
      value: {},
      disabled: Boolean,
      size: String,
      border: Boolean,
      block: Boolean,
      min: Number,
      max: Number
    },
    
    created() {
      this.$on('handleChange', value => {
        this.$emit('change', value);
      });
    }
  };
</script>

<style lang="scss" scoped>
  .checkbox-group {
    display: inline-block;
  }
</style>

