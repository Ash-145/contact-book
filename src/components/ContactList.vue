<template>
  <div class="contact-list">
    <h1>Contact List</h1>
    <div class="search-bar">
      <input v-model="searchTerm" placeholder="Search contacts" />
      <button @click="showNewContactForm = true" class="btn-add">Add Contact</button>
    </div>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <router-link :to="{ name: 'ContactDetails', params: { id: contact.id } }">
          {{ contact.firstName }} {{ contact.lastName }}
        </router-link>
      </li>
    </ul>
    <ContactForm
      v-if="showNewContactForm"
      :initialContact="{ firstName: '', lastName: '', email: '', phone: '' }"
      @save="addContact"
      @cancel="showNewContactForm = false"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import ContactForm from './ContactForm.vue';

export default {
  components: { ContactForm },
  setup() {
    const contacts = ref(JSON.parse(localStorage.getItem('contacts') || '[]'));
    const searchTerm = ref('');
    const showNewContactForm = ref(false);

    const filteredContacts = computed(() => {
      return contacts.value
        .filter(contact =>
          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
        .sort((a, b) => (a.lastName || '').localeCompare(b.lastName || ''));
    });

    const addContact = (newContact) => {
      newContact.id = Date.now().toString();
      contacts.value.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(contacts.value));
      showNewContactForm.value = false;
    };

    return { searchTerm, filteredContacts, showNewContactForm, addContact };
  }
};
</script>

<style scoped>
.contact-list {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-add {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #2980b9;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

li a {
  text-decoration: none;
  color: #2c3e50;
}

li a:hover {
  text-decoration: underline;
}
</style>
