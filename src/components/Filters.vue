<script setup>
import { filters, resetFilters } from '../lib'
</script>

<template>
  <details class="bg-light p-3 my-3">
    <summary>Filter Records</summary>
    <form class="form-inline">
      <label class="sr-only" for="filterSearch">Search</label>
      <input
        v-model="filters.searchTerm"
        id="filterSearch"
        class="form-control mr-sm-2 mb-2"
        placeholder="Search"
      />

      <label class="sr-only" for="filterSort">Sort By</label>
      <select v-model="filters.sort" id="" class="form-control mr-sm-2 mb-2">
        <option value="" disabled>Sort By...</option>
        <option value="latestConvictionDate">Conviction Date</option>
        <option value="name">Name</option>
        <option value="dob">Date of Birth</option>
        <!-- <option value="address">Address</option> -->
      </select>

      <label class="sr-only" for="filterOrder">Order</label>
      <select
        v-model="filters.order"
        id="filterOrder"
        class="form-control mr-sm-2 mb-2"
      >
        <option value="" disabled>Order...</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button
        type="reset"
        @click.prevent="resetFilters"
        class="btn btn-primary mb-2"
      >
        Reset
      </button>
    </form>
  </details>
</template>
