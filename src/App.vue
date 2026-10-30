<script setup lang="ts">
import { abusers, fetchAbusers } from "./lib/abusers";
import AbuserList from "./components/AbuserList.vue";

fetchAbusers();

const containerClass = import.meta.env.DEV
  ? "py-5 container"
  : "container-fluid pt-2";
</script>

<template>
  <div v-if="abusers.loading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <article v-else :class="containerClass">
    <p v-if="!abusers.data.length">There are currently no abusers registered.</p>
    <AbuserList />
  </article>
</template>
