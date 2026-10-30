<script setup lang="ts">
import { abusers } from "../lib/abusers";

const formatDate = (date: string) =>
  Temporal.PlainDate.from(date).toLocaleString("en-US");
</script>

<template>
  <article
    v-for="(abuser, i) in abusers.data"
    :key="i"
    class="card mb-3 overflow-hidden"
  >
    <div class="row g-0">
      <div
        class="col-5 col-sm-4 d-flex align-items-center justify-content-center bg-body-tertiary"
      >
        <a v-if="abuser.headPhoto" :href="abuser.headPhoto" target="_blank">
          <img
            :src="abuser.headPhoto"
            :alt="abuser.name"
            class="img-fluid"
            style="max-height: 15rem"
            loading="lazy"
          />
        </a>
        <span v-else class="py-4 text-body-secondary">No photo</span>
      </div>

      <div class="col-7 col-sm-8">
        <div class="card-body">
          <h2 class="card-title h5">{{ abuser.name }}</h2>

          <dl class="mb-0">
            <template v-if="abuser.alias">
              <dt>Alias(es)</dt>
              <dd>{{ abuser.alias }}</dd>
            </template>

            <dt>Date of Birth</dt>
            <dd>{{ formatDate(abuser.dob) }}</dd>

            <dt>Address</dt>
            <dd class="mb-0">{{ abuser.address }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <ul v-if="abuser.offenses?.length" class="list-group list-group-flush">
      <li
        v-for="(offense, i) in abuser.offenses"
        :key="i"
        class="list-group-item"
      >
        {{ offense.counts }} count(s) of {{ offense.offenseDescription }}
        <small class="d-block text-body-secondary">
          Conviction Date: {{ formatDate(offense.convictionDate) }}
        </small>
        <a v-if="offense.judgement" :href="offense.judgement" target="_blank">
          View Judgment and Sentence
        </a>
      </li>
    </ul>
  </article>
</template>
