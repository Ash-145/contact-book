<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-group">
      <label for="firstName">First Name:</label>
      <input type="text" v-model="contact.firstName" required />
    </div>
    <div class="form-group">
      <label for="lastName">Last Name:</label>
      <input type="text" v-model="contact.lastName" required />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" v-model="contact.email" required />
    </div>
    <div class="form-group">
      <label for="phone">Phone Number:</label>
      <input type="tel" v-model="contact.phone" required />
    </div>
    <div class="form-actions">
      <button type="submit" class="btn-save">Save</button>
      <button type="button" @click="$emit('cancel')" class="btn-cancel">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    initialContact: {
      type: Object,
      default: () => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }),
    },
  },
  data() {
    return {
      contact: { ...this.initialContact }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('save', this.contact);
    },
  },
};
</script>

<style scoped>
.form-container {
  background: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.btn-save,
.btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.btn-save {
  background-color: #27ae60;
}

.btn-save:hover {
  background-color: #229954;
}

.btn-cancel {
  background-color: #e74c3c;
}

.btn-cancel:hover {
  background-color: #c0392b;
}
</style>
