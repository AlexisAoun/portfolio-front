<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <div class="tags">
      <ArticleTag
        v-for="tag in tags"
        :key="tag._id"
        class="tag"
        :id="tag._id"
        :title="tag.name"
        :color="tag.color"
        :borderColor="tag.color"
      />
    </div>
  </div>
</template>
<script>
import ArticleTag from '@/components/ArticleTag.vue'

export default {
  name: 'ArticleListItem',
  components: {
    ArticleTag,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    tags: {
      default: [],
    },
  },
}
</script>
<style>
.container {
  border: solid 1px;
  border-color: #bebebe;
  border-radius: 1rem;
  padding: 1rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>
