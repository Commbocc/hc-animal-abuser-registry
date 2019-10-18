<template>
  <div>

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

      <button type="reset" @click.prevent="resetFilters" class="btn btn-primary mb-2">Reset</button>
    </form>

    <!-- abusers index -->
    <div v-for="(abuser, i) in filteredAbusers" is="AbuserTemplate" :key="i" :abuser="abuser"></div>

  </div>
</template>

<script>
import Abuser from './models/Abuser'
import AbuserTemplate from './components/Abuser'

let App; export default App = {
  install (Vue) {
    Vue.mixin({
      components: {
        HcAnimalAbuserRegistry: this
      }
    })
    // Vue.component('HcAnimalAbuserRegistry', this)
  },
  components: { AbuserTemplate },
  mixins: [Abuser.mixin]
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(App)
}
</script>

<style src="./assets/main.css" lang="css"></style>
