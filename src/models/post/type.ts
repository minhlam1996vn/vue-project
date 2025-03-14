export type Post = {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export interface Posts {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export type PostCreateRequest = {
  title: string
  body: string
  tags: string[]
}

export type PostUpdateRequest = {
  id: number
  title?: string
  body?: string
  tags?: string[]
}
