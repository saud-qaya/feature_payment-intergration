<template>
  <div>
    <h1>Routen-Übersicht</h1>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <NuxtLink :to="route.path">{{ route.path }}</NuxtLink>
        <ul v-if="route.children">
          <li v-for="child in route.children" :key="child.path">
            <NuxtLink :to="child.path">{{ child.path }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { NuxtLink } from '#components'

const router = useRouter()
const routes = router.getRoutes()
</script>
