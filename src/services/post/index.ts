import { api } from '@/services/api'
import type { Post, Posts, PostCreateRequest, PostUpdateRequest } from '@/models/post/type'

const resource = '/posts'

const getPosts = async () => {
  return await api.get<Posts>(resource)
}

const getPostById = async (id: number) => {
  return await api.get<Post>(`${resource}/${id}`)
}

const createPost = async (payload: PostCreateRequest) => {
  return await api.post<Post>(`${resource}/add`, payload)
}

const updatePost = async (payload: PostUpdateRequest) => {
  return await api.put<Post>(`${resource}/${payload.id}`, payload)
}

const deletePost = async (id: number) => {
  return await api.delete<Post>(`${resource}/${id}`)
}

export const postService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
}
