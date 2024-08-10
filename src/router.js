import { createRouter, createWebHistory } from 'vue-router';
import ContactsView from './views/ContactsView.vue';
import ContactDetails from './components/ContactDetails.vue';

const routes = [
  { path: '/', redirect: '/contacts' },
  { path: '/contacts', component: ContactsView },
  { path: '/contact/:id', name: 'ContactDetails', component: ContactDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
