<template>
  <div>
    <ArticleListItem
      v-for="article in articles"
      :key="article._id"
      class="article"
      :title="article.title.fr"
      :tags="article.tags"
      @click="goToArticlePage(article._id)"
    />
  </div>
</template>
<script>
import ArticleListItem from '@/components/ArticleListItem.vue'

export default {
  name: 'ArticleList',
  components: {
    ArticleListItem,
  },
  props: {
    articles: {
      required: true,
    },
  },
  methods: {
    goToArticlePage(articleId) {
      this.$router.push({
        name: 'Article',
        params: { articleId: articleId },
      })
    },
  },
}
</script>
<style>
.article {
  margin: 2rem 2rem;
  cursor: pointer;
}
</style>
