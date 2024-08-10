<template>
    <div class="contacts-view">
      <ContactList />
    </div>
  </template>
  
  <script>
  import ContactList from '../components/ContactList.vue';
  
  export default {
    components: { ContactList },
  };
  </script>
  
  <style scoped>
  .contacts-view {
    padding: 20px;
  }
  </style>
  