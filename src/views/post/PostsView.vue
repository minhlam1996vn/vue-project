<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePostStore } from '@/stores/post'
import type { Posts } from '@/models/post/type'
import { useLoadingStore } from '@/stores/loading'

const postStore = usePostStore()
const loadingStore = useLoadingStore()

const listPosts = computed<Posts>(() => postStore.posts)

const init = async (): Promise<void> => {
  loadingStore.startLoading()

  try {
    await postStore.dispatchGetPosts()
  } catch (error) {
    console.error('Error page:', error)
  } finally {
    loadingStore.stopLoading()
  }
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <div>
    <h1>List Posts</h1>
    <div>
      <ul v-if="listPosts.posts.length">
        <li v-for="post in listPosts.posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
