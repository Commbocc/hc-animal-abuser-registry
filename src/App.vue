<script setup>
import { abusers, filteredAbusers, fetchAbusers } from './lib'
import Filters from './components/Filters.vue'
import Abuser from './components/Abuser.vue'

fetchAbusers()
</script>

<style lang="scss" src="./assets/main.scss"></style>

<template>
  <div>
    <!-- filters -->
    <Filters />

    <!-- loading -->
    <div v-if="abusers.loading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- error -->
    <div v-else-if="abusers.error" class="alert alert-warning">
      {{ abusers.error }}
    </div>
    <!-- index -->
    <Abuser
      v-else
      v-for="(abuser, i) in filteredAbusers"
      :key="i"
      :abuser="abuser"
    />
  </div>
</template>
