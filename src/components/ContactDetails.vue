<template>
  <div v-if="contact" class="details-container">
    <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
    <p>Email: {{ contact.email }}</p>
    <p>Phone: {{ contact.phone }}</p>
    <div class="actions">
      <button @click="editContact" class="btn-edit">Edit</button>
      <button @click="deleteContact" class="btn-delete">Delete</button>
    </div>
    <ContactForm v-if="isEditing" :initialContact="contact" @save="updateContact" @cancel="isEditing = false" />
    <button @click="goBack" class="btn-back">Back</button>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ContactForm from './ContactForm.vue';

export default {
  components: { ContactForm },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const contact = ref(null);
    const isEditing = ref(false);

    const loadContact = () => {
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contact.value = contacts.find(c => c.id === route.params.id);
    };

    const editContact = () => {
      isEditing.value = true;
    };

    const updateContact = (updatedContact) => {
      let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const index = contacts.findIndex(c => c.id === contact.value.id);
      if (index !== -1) {
        contacts[index] = updatedContact;
        localStorage.setItem('contacts', JSON.stringify(contacts));
        contact.value = { ...updatedContact }; // Update the local state immediately
        isEditing.value = false;
      }
    };

    const deleteContact = () => {
      let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts = contacts.filter(c => c.id !== contact.value.id);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      router.push('/contacts');
    };

    const goBack = () => {
      router.push('/contacts');
    };

    onMounted(loadContact);

    return { contact, isEditing, editContact, updateContact, deleteContact, goBack };
  }
};
</script>

<style scoped>
.details-container {
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.details-container h2 {
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-edit {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-delete {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.btn-back {
  padding: 10px 20px;
  background-color: #7f8c8d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.btn-back:hover {
  background-color: #707b7c;
}
</style>
