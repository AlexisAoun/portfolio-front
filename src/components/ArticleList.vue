<template>
  <div class="articleList">
    <div v-if="!isArticleArrayEmpty" class="listContainer">
      <ArticleListItem
        v-for="article in articles"
        :key="article._id"
        class="article"
        :title="article.title.fr"
        :tags="article.tags"
        @click="goToArticlePage(article._id)"
      />
    </div>
    <div v-else class="noArticlesFoundMsg">
      Aucun article ne correspond aux critères
    </div>
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
  computed: {
    isArticleArrayEmpty() {
      return this.articles.length === 0
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
  transition: all ease 200ms;
}

.article:hover {
  transform: translateY(-4px);
}

.articleList {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.listContainer {
  width: 80%;
}

.noArticlesFoundMsg {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

@media screen and (max-width: 1270px) { 
  .listContainer {
    width: 90%;
  }
}
</style>
