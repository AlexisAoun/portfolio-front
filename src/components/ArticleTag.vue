<template>
  <div class="tag" :style="'background-color:' + color + ';'+'border-color:' + borderColor + ';'">{{ title }}</div>
</template>
<script type="module">
export default {
  name: 'articleTag',
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#ff0000',
    },
    borderColor: {
      type: String,
      default: '#ff0000',
    },
  },
}
</script>
<style>
.tag {
  display: inline-block;
  border: solid 3px;
  border-radius: 1rem;
  padding: 0.3rem;
}
</style>
