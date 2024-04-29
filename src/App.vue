<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-toolbar title="SAFR Reports" color="#D90A00">
      <router-link class="menu-item" to="/">Home</router-link>
      <router-link class="menu-item" to="reports">Reports</router-link>
    </v-toolbar>
    <RouterView />
  </v-app>
</template>

<style scoped>
.menu-item {
  text-decoration: none;
  font-size: 17.5px;
  font-weight: 400;
  padding-right: 15px;
  color:gold;
}
.menu-item.router-link-active {
  font-weight: 250;
}
</style>
