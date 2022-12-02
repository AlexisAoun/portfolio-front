<template>
  <div class="filter">
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
      title="Retirés les tags"
      color="#BEBEBE"
      borderColor="#BEBEBE"
      @click="resetTags"
    />
    <div @click="tagSelectorIsVisible=!tagSelectorIsVisible" class="tagSelectorHeader">
      <h3 v-if="tagSelectorIsVisible" >Cacher les tags</h3>
      <h3 v-else>Montrer les tags</h3>
    </div>
    <TagSelector
      v-if="tags && tags.length !== 0 && tagSelectorIsVisible"
      ref="tagSelectorRef"  
      @update="updateSelectedTags"
      :tags="tags"
    />
  </div>
</template>
<script>
import TagSelector from '@/components/TagSelector.vue'
import ArticleTag from '@/components/ArticleTag.vue'

export default {
  components: {
    TagSelector,
    ArticleTag,
  },
  data() {
    return {
      tags: [],
      selectedTags: [],
      tagSelectorIsVisible: false,
      url: 'http://localhost:8000',
    }
  },
  computed: {
    selectedTagsLength() {
      return this.selectedTags.length
    },
  },
  methods: {
    resetTags() {
      this.selectedTags = []
      this.$refs.tagSelectorRef.resetTags();
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
    async fetchData() {
      const res = await fetch(this.url + '/tag/all').then((res) =>
        res?.ok ? res : null
      )
      const data = await res?.json()
      if (data) {
        this.tags = data
      }
    },
  },
  beforeMount() {
    this.fetchData()
  },
}
</script>
<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tagSelectorHeader {
  cursor: pointer;
}

.tagSelectorHeader h3{
  text-decoration: underline;
}
</style>
