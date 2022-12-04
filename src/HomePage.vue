<template>
  <div class="home">
    <div id="firstSection">
      <div class="upperHalf">
        <div class="socialLogo">
          <a href="https://github.com/AlexisAoun" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
          </a>
          <a
            href="https://www.linkedin.com/in/alexis-aoun-56601020b/"
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
          </a>
        </div>
        <img class="profilPic" :src="this.apiUrl+'/media/ALEXIS.png'" alt="Alexis Aoun" />
      </div>
      <div class="bottomHalf">
        <div class="myDescription">
          <h1>Mon portfolio</h1>
          <p>
            Je suis étudiant en ingénierie spécialisé en Data Science et passioné depuis mon plus jeune âge
            par l'informatique. Ma curiosité sans limite m'a permis d'acquérir
            bon nombre de compétences en programmation bas niveau, haut
            niveau, hardware, dév. web, administration de système linux,
            data... Tant d'outils qui m'ont permis de
            mettre en oeuvre plusieurs projets, personnels et professionels, que
            je vous présente ici
          </p>
        </div>

        <div class="menu">
          <div class="menuEntry" @click="scrollToArticles">
            <h2>Mes Projets</h2>
          </div>
          <div class="menuEntry">
            <h2>Me Contacter</h2>
          </div>
          <div class="menuEntry">
            <h2>Mon CV</h2>
          </div>
        </div>
      </div>
      <div class="scrollDown" @click="scrollToArticles"/>
    </div>
  </div>
  <!-- filter section   -->
  <div id="filter" class="filter">
    <h3>Filtre - Tags séléctionnés</h3>
    <div v-if="selectedTags && selectedTagsLength !== 0" class="selectedTags">
      <ArticleTag
        v-for="tag in selectedTags"
        :key="tag._id"
        class="tag"
        :id="tag._id"
        :title="tag.name"
        :color="tag.color"
        :borderColor="tag.color"
      />
    </div>
    <p v-if="selectedTagsLength === 0">Aucun tag n'est séléctionné</p>
    <ArticleTag
      v-if="selectedTagsLength !== 0"
      class="resetTag"
      :id="-1"
      title="Retiré les tags"
      color="#BEBEBE"
      borderColor="#BEBEBE"
      @click="resetTags"
    />
    <div @click="switchTagSelectorVisibility" class="tagSelectorHeader">
      <h3 v-if="tagSelectorIsVisible">Cacher les tags</h3>
      <h3 v-else>Montrer les tags</h3>
    </div>
    <TagSelector
      v-if="tags && tags.length !== 0 && tagSelectorIsVisible"
      ref="tagSelectorRef"
      @update="updateSelectedTags"
      :tags="tags"
      :initialSelectedTagsId="selectedTagsId(selectedTags)"
    />
  </div>

  <!-- Article list section -->
  <ArticleList :articles="filteredArticles" ref="articleList"/>
</template>
<script>
import TagSelector from '@/components/TagSelector.vue'
import ArticleTag from '@/components/ArticleTag.vue'
import ArticleList from '@/components/ArticleList.vue'

export default {
  name: 'HomePage',
  components: {
    TagSelector,
    ArticleTag,
    ArticleList,
  },
  data() {
    return {
      tags: [],
      selectedTags: [],
      articles: [],
      tagSelectorIsVisible: false,
    }
  },
  computed: {
    selectedTagsLength() {
      return this.selectedTags.length
    },
    filteredArticles() {
      const tmp = this.articles.filter((article) => {
        let numberOfCriteriaSatisfied = 0
        if (this.selectedTagsLength !== 0) {
          if (article.tags) {
            article.tags.forEach((tag) => {
                this.selectedTags.forEach((selectedTag) => {
                  if(selectedTag._id === tag._id) {
                    numberOfCriteriaSatisfied++
                  }
                })
            })
          }
        }
        return numberOfCriteriaSatisfied === this.selectedTagsLength
      })
      return tmp.sort((a,b) => a.value - b.value)
    },
  },
  methods: {
    scrollToArticles() {
      document.getElementById('filter').scrollIntoView({ behavior: 'smooth'})
    },
    selectedTagsId(selectedTags) {
      let output = []
      if (selectedTags.length !== 0) {
        selectedTags.forEach((tag) => {
          output.push(tag._id)
        })
      }
      return output
    },
    switchTagSelectorVisibility() {
      this.tagSelectorIsVisible = !this.tagSelectorIsVisible
    },
    resetTags() {
      this.selectedTags = []
      if(this.tagSelectorIsVisible) {
        this.$refs.tagSelectorRef.resetTags()
      }
    },
    updateSelectedTags(updatedTagsId) {
      this.selectedTags = []
      updatedTagsId.forEach((tagId) => {
        const tag = this.getTagById(tagId)
        this.selectedTags.push(tag)
      })
    },
    getTagById(id) {
      let output = null
      this.tags.forEach((tag) => {
        if (tag._id === id) {
          output = tag
        }
      })
      return output
    },
    async fetchTags() {
      const res = await fetch(this.apiUrl + '/tag/all').then((res) =>
        res?.ok ? res : null
      )
      const data = await res?.json()
      if (data) {
        this.tags = data
      }
    },
    async fetchArticles() {
      const res = await fetch(this.apiUrl + '/article/all').then((res) =>
        res?.ok ? res : null
      )
      const data = await res?.json()
      if (data) {
        this.articles = data
      }
    },
  },
  beforeMount() {
    this.fetchTags()
    this.fetchArticles()
  },
}
</script>
<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dcdcdc;
  width: 80%;
  margin-left: 10%;
  border: solid 0.5px lightgray;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.tagSelectorHeader {
  cursor: pointer;
}

.tagSelectorHeader h3 {
  text-decoration: underline;
}

.home {
  overflow-x: hidden;
}

#firstSection {
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
}

.upperHalf {
  position: relative;
  width: 120%;
  height: 40%;
  bottom: 10%;
  right: 5%;
  transform: rotate(5deg);
  background-color: #a6a6a6;
}

.bottomHalf {
  display: flex;
  justify-content: space-between;
}

.socialLogo {
  position: absolute;
  left: 13%;
  top: 60%;
  display: flex;
  font-size: 4vh;
  transform: rotate(-5deg);
}

.socialLogo a {
  text-decoration: none;
  color: black;
  margin-right: 30%;
}

.profilPic {
  position: absolute;
  left: 70%;
  top: 25%;
  transform: rotate(-5deg);
  width: 10%;
  min-width: 150px;
  max-width: 400px;
  height: auto;
}

.myDescription {
  margin-left: 10%;
  width: 40%;
}
.myDescription p {
  margin-top: 5%;
  font-size: 2.4vh;
  text-align: left;
}

.myDescription h1 {
  font-size: 3.5vh;
  letter-spacing: 2px;
  font-weight: bold;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 11%;
  margin-top: 2%;
  text-align: center;
}

.menu .menuEntry {
  text-decoration: underline;
  color: black;
  transition: all ease 200ms;
  cursor: pointer;
}

.menu .menuEntry:hover {
  transform: translateY(-4px);
}

.menu h2 {
  font-size: 3.3vh;
}

.scrollDown {
  height: 50px;
  width: 30px;
  border: 2px solid black;
  position: absolute;
  left: 50%;
  bottom: 20px;
  border-radius: 50px;
  cursor: pointer;
}
.scrollDown::before,
.scrollDown::after {
  content: "";
  position: absolute;
  top: 20%;
  left: 50%;
  height: 10px;
  width: 10px;
  transform: translate(-50%, -100%) rotate(45deg);
  border: 2px solid black;
  border-top: transparent;
  border-left: transparent;
  animation: scroll-down 1s ease-in-out infinite;
}
.scrollDown::before {
  top: 30%;
  animation-delay: 0.3s;
}

@keyframes scroll-down {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    top: 90%;
    opacity: 0;
  }
}

@media screen and (max-width: 1270px) {
  .scrollDown {
    left: 46.5%;
  }
  .upperHalf {
    position: static;
    transform: rotate(0);
    display: flex;
    flex-direction: column-reverse;
    height: 30%;
    width: 100%;
  }
  .profilPic {
    position: static;
    transform: rotate(0);
    margin: auto;
  }
  .socialLogo {
    position: static;
    transform: rotate(0);
    justify-content: space-around;
  }
  .socialLogo a {
    margin: 0;
  }
  .menu {
    display: none;
  }
  .myDescription {
    width: 80%;
    margin-left: 10%;
    margin-top: 5%;
  }
  .myDescription h1 {
    text-align: center;
  }
  .myDescription p {
    text-align: center;
  }
}
</style>
