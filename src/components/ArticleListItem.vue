<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <h3 class="desc">{{ getDesc }}<span class="readMore">  ...Lire plus</span></h3>
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
    content: {
      type: String,
      required: true
    },
    tags: {
      default: [],
    },
  },
  computed: {
    getDesc(){
      return this.content.split(' ').slice(0, 25).join(' ').replace('<br>', '');
    }
  },  
}
</script>
<style>
.container {
  border: solid 0.5px;
  border-color: lightgray;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
.readMore {
  font-weight: bolder;
  color: grey;
}
.desc {
  font-size: 1rem;
}
@media screen and (max-width: 1270px) {
  .container h2 {
    font-size: 1.3rem;
  }
}
</style>
