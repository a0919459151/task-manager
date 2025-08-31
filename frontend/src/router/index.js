import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../views/TaskList.vue';
import AddTask from '../views/AddTask.vue';
import EditTask from '../views/EditTask.vue';

const routes = [
  {
    path: '/',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/add',
    name: 'AddTask',
    component: AddTask,
  },
  {
    path: '/edit/:id',
    name: 'EditTask',
    component: EditTask,
    props: true, // 啟用 props，讓路由參數可以作為元件的 props 傳入
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;