<template>
  <div id="app">

    <!-- filter -->
    <form class="form-inline">
      <label class="sr-only" for="filterSearch">Search</label>
      <input v-model="filterSearch" id="filterSearch" class="form-control mr-sm-2 mb-2" placeholder="Search">

      <label class="sr-only" for="filterSort">Sort By</label>
      <select v-model="filterSort" id="" class="form-control mr-sm-2 mb-2">
        <option value="" disabled>Sort By...</option>
        <option value="latestConvictionDate">Conviction Date</option>
        <option value="name">Name</option>
        <option value="dob">Date of Birth</option>
        <!-- <option value="address">Address</option> -->
      </select>

      <label class="sr-only" for="filterOrder">Order</label>
      <select v-model="filterOrder" id="filterOrder" class="form-control mr-sm-2 mb-2">
        <option value="" disabled>Order...</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button type="reset" @click.prevent="reset" class="btn btn-primary mb-2">Reset</button>
    </form>

    <!-- abusers index -->
    <div v-for="abuser in filteredAbusers" is="AbuserTemplate" :abuser="abuser"></div>

  </div>
</template>

<script>
import Abuser from './models/Abuser'
import AbuserTemplate from './components/Abuser'

export default {
  name: 'app',
  components: { AbuserTemplate },
  mixins: [Abuser.mixin],
  data () {
    return {
      filterSearch: null,
      filterSort: 'latestConvictionDate',
      filterOrder: 'desc'
    }
  },
  methods: {
    reset () {
      this.filterSearch = null
      this.filterSort = 'latestConvictionDate'
      this.filterOrder = 'desc'
    }
  }
}
</script>

<style src="./assets/main.scss" lang="scss"></style>
