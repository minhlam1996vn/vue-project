import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API } from '@/services'
import type { Posts } from '@/models/post/type'
import useHandleError from '@/composables/useHandleError'

export const usePostStore = defineStore('postStore', () => {
  const { handleError } = useHandleError()
  const posts = ref<Posts>({
    posts: [],
    total: 0,
    skip: 0,
    limit: 0,
  })

  const initPosts = (newPosts: Posts): void => {
    posts.value = newPosts
  }

  const dispatchGetPosts = async (): Promise<void> => {
    try {
      const { data } = await API.post.getPosts()

      initPosts(data)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    posts,
    dispatchGetPosts,
  }
})
