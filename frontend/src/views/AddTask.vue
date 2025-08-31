<template>
  <div class="container mx-auto p-4 max-w-2xl">
    <div class="bg-white rounded-lg shadow-xl p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Add New Task</h1>
      <p class="text-gray-500 mb-6">Fill in the details below to create a new task.</p>
      <form @submit.prevent="saveTask">
        <div class="mb-6">
          <label for="title" class="block text-gray-700 font-semibold mb-2">Task Title</label>
          <input type="text" id="title" v-model="newTask.title" placeholder="e.g. Design the new landing page" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-6">
          <label for="content" class="block text-gray-700 font-semibold mb-2">Task Content</label>
          <textarea id="content" v-model="newTask.content" rows="4" placeholder="Add a more detailed description of the task..." class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div class="mb-8">
          <label for="status" class="block text-gray-700 font-semibold mb-2">Task Status</label>
          <select id="status" v-model="newTask.status" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div class="flex justify-end space-x-4">
          <button @click="cancel" type="button" class="px-6 py-3 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300 font-semibold transition-colors">Cancel</button>
          <button type="submit" class="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold transition-colors">Save Task</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const addTask = inject('addTask');
const router = useRouter();

const newTask = ref({
  title: '',
  content: '',
  status: 'Pending',
});

function saveTask() {
  addTask({ ...newTask.value });
  router.push('/');
}

function cancel() {
  router.push('/');
}
</script>