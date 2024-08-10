<template>
  <nav>
    <router-link to="/contacts">Contacts</router-link>
  </nav>
  <router-view class="main-content"></router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  padding: 15px;
  background-color: #34495e;
  text-align: center;
  border-bottom: 4px solid #2c3e50;
}

nav a {
  margin: 0 20px;
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

nav a:hover {
  text-decoration: underline;
  color: #bdc3c7;
}

.main-content {
  padding: 20px;
}
</style>
