<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-toolbar title="SAFR Report Tool" color="#D90A00">
      <router-link class="menu-item" to="/">Home</router-link>
      <router-link class="menu-item" to="reports">MDT Reports</router-link>
    </v-toolbar>

    <RouterView />
  </v-app>
</template>

<style scoped>
.menu-item {
  text-decoration: none;
  font-size: 10px;
  font-weight: 250;
  padding-right: 10px;
  color:gold;
}

.menu-item.router-link-active {
  font-weight: 250;
}
</style>
