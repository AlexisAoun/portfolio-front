<template>
  <TagSelector v-if="tags && tags.length !== 0" @update="updateSelectedTags" :tags="tags"/>
</template>
<script>
import TagSelector from '@/components/TagSelector.vue'

export default {
  components: {
    TagSelector
  },
  data() {
    return {
      tags: []
    }
  },
  methods: {
    updateSelectedTags(selectedTags) {
      console.log(selectedTags)
    },
    async fetchData() {
      const url = 'http://localhost:8000'
      const res = await fetch(url + '/tag/all').then((res) => res?.ok ? res : null)
      const data = await res?.json()
      if(data) {
        this.tags = data
      }
    }
  },
  beforeMount() {
    this.fetchData()
  },
}
</script>
<style scoped>
</style>
