<template>
  <transition :name="disableTransitions ? '' : 'el-zoom-in-center'">
    <span 
      class="tag"
      :class="[
        type && 'tag--' + type,
        size && 'tag--' + size
      ]"
      :style="{
        backgroundColor: color
      }"
    >
      <slot></slot>
      <i 
        v-if="closable" 
        class="tag-close el-icon-close"
        @click.stop="handleClick"
      >
      </i>
    </span>
  </transition>
</template>

<script>
export default {
  name: "Tag",

  componentName: "Tag",

  props: {
    type: String,
    size: String,
    color: String,
    closable: Boolean,
    disableTransitions: Boolean
  },
  methods: {
    handleClick(event) {
      this.$emit("close", event);
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  white-space: nowrap;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
  border-radius: 4px;
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;

  &.tag--success {
    border-color: rgba(103, 194, 58, 0.2);
    background-color: rgba(103, 194, 58, 0.1);
    color: #67c23a;

    .tag-close {
      color: #67c23a;
      &:hover {
        background-color: #67c23a;
      }
    }
  }

  &.tag--info {
    background-color: hsla(220, 4%, 58%, 0.1);
    border-color: hsla(220, 4%, 58%, 0.2);
    color: #909399;

    .tag-close {
      color: #909399;
      &:hover {
        background-color: #909399;
      }
    }
  }

  &.tag--warning {
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.2);
    color: #e6a23c;

    .tag-close {
      color: #e6a23c;
      &:hover {
        background-color: #e6a23c;
      }
    }
  }

  &.tag--danger {
    background-color: hsla(0, 87%, 69%, 0.1);
    border-color: hsla(0, 87%, 69%, 0.2);
    color: #f56c6c;

    .tag-close {
      color: #f56c6c;

      &:hover {
        background-color: #f56c6c;
      }
    }
  }

  &.tag--medium {
    height: 28px;
    line-height: 26px;

    .tag-close {
      transform: scale(0.8);
    }
  }

  &.tag--small {
    height: 24px;
    padding: 0 8px;
    line-height: 22px;

    .tag-close {
      transform: scale(0.8);
    }
  }

  &.tag--mini {
    height: 20px;
    padding: 0 5px;
    line-height: 19px;

    .tag-close {
      transform: scale(0.7);
    }
  }

  .tag-close {
    display: inline-block;
    margin-left: 5px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    vertical-align: middle;
    text-align: center;
    border-radius: 50%;
    color: #409eff;
    cursor: pointer;

    &:hover {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
