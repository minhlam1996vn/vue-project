import { authService } from '@/services/auth'
import { postService } from '@/services/post'

export const API = {
  auth: authService,
  post: postService,
}
