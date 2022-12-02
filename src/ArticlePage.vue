<template>
  <div>Article page</div>
</template>
<script>
export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      required: true,
    },
  },
  data() {
    return {
      article: null,
      url: 'http://localhost:8000',
    }
  },
  methods: {
    async fetchArticle() {
      const res = await fetch(this.url + '/article/' + this.articleId).then(
        (res) => (res?.ok ? res : null)
      )
      const data = await res?.json()
      if (data) {
        this.article = data
      }
    },
  },
  beforeMount() {
    this.fetchArticle()
  },
}
</script>
