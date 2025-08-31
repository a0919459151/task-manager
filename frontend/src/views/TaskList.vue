<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-gray-800">Tasks</h1>
      <div class="flex space-x-2 items-center">

        <div class="inline-flex rounded-lg shadow-sm bg-gray-200 p-1">
          <button @click="filterTasks('All')" :class="['px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300',
            { 'bg-white text-gray-800 shadow': currentFilter === 'All', 'text-gray-500': currentFilter !== 'All' }]">
            All
          </button>
          <button @click="filterTasks('Pending')"
            :class="['px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300',
              { 'bg-white text-gray-800 shadow': currentFilter === 'Pending', 'text-gray-500': currentFilter !== 'Pending' }]">
            Pending
          </button>
          <button @click="filterTasks('In Progress')"
            :class="['px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300',
              { 'bg-white text-gray-800 shadow': currentFilter === 'In Progress', 'text-gray-500': currentFilter !== 'In Progress' }]">
            In Progress
          </button>
          <button @click="filterTasks('Completed')"
            :class="['px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300',
              { 'bg-white text-gray-800 shadow': currentFilter === 'Completed', 'text-gray-500': currentFilter !== 'Completed' }]">
            Completed
          </button>
        </div>

        <button @click="addTask"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd" />
          </svg>
          Add Task
        </button>
      </div>
    </div>

    <div v-if="paginatedTasks.length">
      <TaskCard v-for="task in paginatedTasks" :key="task.id" :task="task" @delete="confirmDelete" />
    </div>
    <div v-else class="text-center text-gray-500 mt-12 text-lg">
      No tasks found
    </div>

    <div v-if="filteredTasks.length > itemsPerPage" class="flex justify-center mt-6 space-x-2">
      <button v-for="page in totalPages" :key="page" @click="currentPage = page"
        :class="['px-3 py-1 rounded-lg', { 'bg-blue-600 text-white': currentPage === page, 'bg-gray-200 text-gray-700': currentPage !== page }]">
        {{ page }}
      </button>
    </div>

    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold mb-2">Confirm Deletion</h3>
        <p class="text-gray-600 mb-4">Are you sure you want to delete this task? This action cannot be undone</p>
        <div class="flex justify-end space-x-2">
          <button @click="cancelDelete"
            class="px-4 py-2 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300">Cancel</button>
          <button @click="executeDelete" class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700">Confirm
            Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'; // Add onMounted
import { useRouter } from 'vue-router';
import TaskCard from '../components/TaskCard.vue';
import { client } from '../api/taskApiClient'; // Import the API client

const router = useRouter();

const tasks = ref([]); // Initialize tasks as a ref

// Fetch tasks when the component is mounted
onMounted(fetchTasks);

// Status filtering
const currentFilter = ref('All');
const filteredTasks = computed(() => {
  if (currentFilter.value === 'All') {
    return tasks.value;
  }
  return tasks.value.filter(task => task.status === currentFilter.value);
});

function filterTasks(status) {
  currentFilter.value = status;
  currentPage.value = 1; // Reset to first page after filtering
}

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTasks.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredTasks.value.length / itemsPerPage);
});

// Delete confirmation modal
const showDeleteModal = ref(false);
const taskToDeleteId = ref(null);

// Fetch tasks from the backend
async function fetchTasks() {
  try {
    const response = await client.getTasks();
    if (response.status === 200) {
      tasks.value = response.body.map(task => ({ ...task, id: task._id }));
    } else {
      console.error('Failed to fetch tasks:', response.error);
      // Handle error, e.g., show a message to the user
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Handle network error
  }
};

function confirmDelete(id) {
  taskToDeleteId.value = id;
  showDeleteModal.value = true;
}

function cancelDelete() {
  showDeleteModal.value = false;
  taskToDeleteId.value = null;
}

// Execute delete operation
async function executeDelete() {
  try {
    const response = await client.deleteTask({ params: { id: taskToDeleteId.value } });
    if (response.status === 200) {
      fetchTasks(); // Refresh the task list after deletion
    } else {
      console.error('Failed to delete task:', response.error);
      // Handle error
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    // Handle network error
  } finally {
    cancelDelete();
  }
};

function addTask() {
  router.push({ name: 'AddTask' });
}
</script>