<script setup>
const props = defineProps({
  abuser: Object,
})

const formatDate = (datetime) => {
  return new Date(datetime).toLocaleDateString()
}
</script>

<template>
  <div class="card card-body abuser my-3">
    <div class="row">
      <div class="col-md-3">
        <p class="text-center">
          <img
            v-if="abuser.imgSrc"
            :src="abuser.imgSrc"
            :alt="abuser.name"
            class="img-responsive center-block img-fluid mx-auto"
          />
          <span v-else class="h2 thumbnail">
            <i class="fa fa-user fa-5x"></i><br />
            No Image
          </span>
        </p>
      </div>
      <div class="col-md-9">
        <dl class="dl-horizontal">
          <dt>Name</dt>
          <dd>{{ abuser.name }}</dd>

          <dt v-if="abuser.aliases">Alias(es)</dt>
          <dd v-if="abuser.aliases">{{ abuser.aliases }}</dd>

          <dt>Date of Birth</dt>
          <dd>{{ formatDate(abuser.dob) }}</dd>

          <dt>Address</dt>
          <dd>{{ abuser.address }}</dd>

          <dt v-if="abuser.offenses.length">Offenses</dt>
          <dd v-if="abuser.offenses.length">
            <ul>
              <li v-for="(offense, i) in abuser.offenses" :key="i">
                <ul class="list-unstyled">
                  <li>
                    {{ offense.counts }} count(s) of {{ offense.description }}
                  </li>
                  <li>
                    <em>Conviction Date:</em>
                    {{ formatDate(offense.convictionDate) }}
                  </li>
                  <li v-if="offense.judgement">
                    <a :href="offense.judgement" target="_blank">
                      View Judgment and Sentence
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
