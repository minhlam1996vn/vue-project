<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppLoading from '@/components/common/AppLoading.vue'
</script>

<template>
  <UApp>
    <header>
      <div
        class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full"
      >
        <nav>
          <ul class="flex flex-rows items-center gap-4">
            <li>
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
              <RouterLink to="/about">About</RouterLink>
            </li>
            <li>
              <RouterLink to="/post">Post</RouterLink>
            </li>
            <li>
              <RouterLink to="/login">Login</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Phần hiển thị nội dung trang (sử dụng Vue Router) -->
    <RouterView />
    <AppLoading />
  </UApp>
</template>
