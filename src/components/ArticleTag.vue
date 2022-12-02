<template>
  <div
    class="tag"
    :style="
      'background-color:' + computeColor + ';' + 'border-color:' + computeBorderColor + ';'
    "
  >
    {{ title }}
  </div>
</template>
<script type="module">
export default {
  name: 'articleTag',
  props: {
    id: {
      type: Number,
      required: true,
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
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computeColor() {
      return this.selected ? "#BEBEBE" : this.color
    },
    computeBorderColor() {
      return this.selected ? "#BEBEBE" : this.borderColor
    }
  },
}
</script>
<style>
.tag {
  display: inline-block;
  border: solid 3px;
  border-radius: 1rem;
  padding: 0.3rem;
  font-size: 0.8rem;
}
</style>
