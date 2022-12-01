<template>
  <div class="selector">
    <div v-if="techTags" class="section">
      <h3>Technical tags</h3>
      <div class="tags">
        <ArticleTag
          v-for="tag in techTags"
          :key="tag._id"
          class="tag"
          :id="tag._id"
          :selected="isSelected(tag._id)"
          :title="tag.name"
          @click="selectTag(tag._id)"
          :color="tag.color"
          :borderColor="tag.color"
        />
      </div>
    </div>
    <div v-if="experienceTags" class="section">
      <h3>Experiences tags</h3>
      <div class="tags">
        <ArticleTag
          v-for="tag in experienceTags"
          :key="tag._id"
          class="tag"
          :id="tag._id"
          :selected="isSelected(tag._id)"
          :title="tag.name"
          @click="selectTag(tag._id)"
          :color="tag.color"
          :borderColor="tag.color"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ArticleTag from '@/components/ArticleTag.vue'

export default {
  name: 'TagSelector',
  components: {
    ArticleTag,
  },
  props: {
    tags: {
      required: true,
    },
  },
  data() {
    return {
      selectedTags: [],
      techTags: [],
      experienceTags: [],
    }
  },
  methods: {
    selectTag(id) {
      if (this.isSelected(id)) {
        this.unselectTag(id)
      } else {
        this.selectedTags.push(id)
      }
      this.$emit('update', this.selectedTags)
    },
    isSelected(id) {
      let output = false
      this.selectedTags.forEach((tagId) => {
        output = !output ? tagId === id : true
      })
      return output
    },
    unselectTag(id) {
      const index = this.selectedTags.indexOf(id)
      if (index > -1) {
        this.selectedTags.splice(index, 1)
      }
    },
  },
  beforeMount() {
    this.tags.forEach((tag) => {
      if (tag.tag_type === 'Tech') {
        this.techTags.push(tag)
      } else if (tag.tag_type === 'Experience') {
        this.experienceTags.push(tag)
      }
    })
  },
}
</script>
<style>
.selector {
  display: flex;
  justify-content: space-evenly;
}

.section {
  width: 35%;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  margin: 0.5rem 0.2rem 0.5rem 0.2rem;
  cursor: pointer;
}
</style>
