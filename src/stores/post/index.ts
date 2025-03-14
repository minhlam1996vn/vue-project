import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API } from '@/services'
import type { Posts } from '@/models/post/type'
import { isAxiosError } from 'axios'

export const usePostStore = defineStore('postStore', () => {
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
      if (isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            // 400 Bad Request
            break
          case 404:
            // 404 Not Found
            break
          case 500:
            // 500 Internal Server Error
            break
          default:
            // Other error
            break
        }
      }

      throw error
    }
  }

  return {
    posts,
    dispatchGetPosts,
  }
})
