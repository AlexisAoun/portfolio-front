<template>
  <div class="returnBtn" @click="returnToHomePage">
    <div class="arrow">&lt;</div>
    <div class="label">Revenir à la page d'accueil</div>
  </div>
  <div v-if="article" class="articleContainer">
    <h2 class="articleTitle">{{ article.title.fr }}</h2>
    <div v-if="!isImageArrayEmpty" class="imagesContainer">
      <div
        v-for="(image_url, index) in article.images_url"
        v-bind:key="index"
        class="imageContainer"
        :style="'width: ' + getImageContainerWidth + '%;'"
      >
        <img :src="getImgSrc(image_url)" alt="project thumbnail" />
      </div>
    </div>
    <div v-html="article.content.fr" class="content">
    </div>
    <div class="footer">
      <div class="tagsContainer">
        <h2>Tags</h2>
        <div v-if="article.tags" class="tags">
          <ArticleTag
            v-for="tag in article.tags"
            :key="tag._id"
            class="tag"
            :id="tag._id"
            :title="tag.name"
            :color="tag.color"
            :borderColor="tag.color"
          />
        </div>
      </div>
      <div
        v-if="article.sourcecode_link || article.demo_link"
        class="linksContainer"
      >
        <div v-if="article.sourcecode_link" class="link">
          <a target="_blank" :href="article.sourcecode_link"> Code source </a>
        </div>
        <div v-if="article.demo_link" class="link">
          <a target="_blank" :href="article.demo_link"> Démo </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArticleTag from '@/components/ArticleTag.vue'

export default {
  name: 'ArticlePage',
  props: {
    articleId: {
      required: true,
    },
  },
  components: {
    ArticleTag,
  },
  data() {
    return {
      article: null,
    }
  },
  computed: {
    isImageArrayEmpty() {
      return this.article.images_url.length === 0
    },
    numberOfImages() {
      return this.article.images_url.length
    },
    getImageContainerWidth() {
      return this.numberOfImages === 1 ? 100 : 100 / this.numberOfImages - 10
    },
  },
  methods: {
    returnToHomePage() {
      this.$router.push({
        name: 'Home',
      })
    },
    getImgSrc(imageUrl) {
      return this.apiUrl + '/media/' + imageUrl
    },
    async fetchArticle() {
      const res = await fetch(this.apiUrl + '/article/' + this.articleId).then(
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
<style>
.returnBtn {
  display: flex;
  position: absolute;
  top: 2rem;
  left: 2rem;
  align-items: center;
  cursor: pointer;
}

.returnBtn :hover {
  text-decoration: underline;
}

.arrow {
  margin-right: 0.8rem;
  font-size: 1.5rem;
  text-decoration: none !important;
}

.articleContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  padding: 4rem;
}

.imagesContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.imageContainer {
  width: 40%;
  margin-top: 3rem;
}

.imageContainer img {
  max-width: 100%;
}

.content {
  margin-top: 2rem;
  padding: 5rem;
  font-size: 1.3rem;
}

.footer {
  display: flex;
  width: 80%;
  justify-content: space-evenly;
}

.tagsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 0.1rem #bebebe;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.tags {
  display: flex;
}

.linksContainer {
  display: flex;
  align-items: center;
}

.link {
  margin: 0 1rem 0 1rem;
  border: solid 0.08rem #bebebe;
  padding: 0.3rem;
  border-radius: 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: all ease 200ms;
}

.link a {
  text-decoration: none;
  color: black;
}

.link:hover {
  border: solid 0.1rem;
  transform: translateY(-2px);
}

@media screen and (max-width: 1270px) { 
  .articleContainer {
    padding: 3rem;
  }
  .content {
    font-size: 0.9rem;
    padding: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: justify;
  } 
  .footer {
    flex-direction: column-reverse;
    align-items: center;
  }

  .linksContainer {
    margin-bottom: 1rem;
  }

  .link {
    text-align: center;
  }
}
</style>
