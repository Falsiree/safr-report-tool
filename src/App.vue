<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-toolbar title="SAFR Report Tool" color="black">
      <router-link class="menu-item" to="/">Home</router-link>
      <router-link class="menu-item" to="reports">MDT Reports</router-link>
      <router-link class="menu-item" to="Test Button">Test Button</router-link>
    </v-toolbar>

    <RouterView />
  </v-app>
</template>

<style scoped>
.menu-item {
  text-decoration: none;
  font-size: 17px;
  font-weight: 300;
  padding-right: 15px;
  color: goldenrod;
}

.menu-item.router-link-active {
  font-weight: 600;
}
</style>
