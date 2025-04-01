<template>
  <Teleport to="body">
    <div v-if="isLoading">
      <div>Loading...</div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { computed } from 'vue'

const loadingStore = useLoadingStore()
const isLoading = computed(() => loadingStore.isLoading)
</script>
