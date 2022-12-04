<template>
  <div class="selector">
    <div v-if="techTags" class="section">
      <h3>Tags technologies</h3>
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
      <h3>Tags expériences</h3>
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
    initialSelectedTagsId: {
      default: [],
    },
  },
  data() {
    return {
      selectedTagsId: [],
      techTags: [],
      experienceTags: [],
    }
  },
  methods: {
    selectTag(id) {
      if (this.isSelected(id)) {
        this.unselectTag(id)
      } else {
        this.selectedTagsId.push(id)
      }
      this.$emit('update', this.selectedTagsId)
    },
    isSelected(id) {
      let output = false
      this.selectedTagsId.forEach((tagId) => {
        output = !output ? tagId === id : true
      })
      return output
    },
    unselectTag(id) {
      const index = this.selectedTagsId.indexOf(id)
      if (index > -1) {
        this.selectedTagsId.splice(index, 1)
      }
    },
    resetTags() {
      this.selectedTagsId = []
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
    this.selectedTagsId = this.initialSelectedTagsId
  },
  mounted() {
    this.selectedTagsId = this.initialSelectedTagsId
  },
}
</script>
<style>
.selector {
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
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
  transition: all ease 100ms;
}

.tag:hover {
  transform: translateY(-2px);
}

@media screen and (max-width: 1270px) {
  .selector {
    flex-direction: column;
    align-items: center;
  }

  .section {
    width: 80%;
  }

  .section h3 {
    text-align: center;
  }
}
</style>
