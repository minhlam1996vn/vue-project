<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePostStore } from '@/stores/post'
import type { Posts } from '@/models/post/type'

const postStore = usePostStore()
const listPosts = computed<Posts>(() => postStore.posts)
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  try {
    await postStore.dispatchGetPosts()
  } catch (error) {
    console.error('Error page:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>List Posts</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <ul v-if="listPosts.posts.length">
        <li v-for="post in listPosts.posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
