<template>
  <div class="bg-white rounded-lg shadow-sm p-5 mb-4">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-bold text-gray-800">{{ task.title }}</h2>
      <div class="flex space-x-2">
        <button @click="editTask" class="text-gray-500 hover:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.111 5.343L.364 17.636a.5.5 0 00.22.219l.793.793a.5.5 0 00.22.219l12.28-12.28-2.828-2.828L7.475 7.475z" />
          </svg>
        </button>
        <button @click="confirmDelete" class="text-gray-500 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    <p class="text-gray-600 mb-3">{{ task.content }}</p>
    <div :class="statusBadgeClass" class="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase">{{ task.status }}</div>
    <p class="text-gray-400 text-xs mt-2">Last modified: {{ task.lastEdited }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const emit = defineEmits(['delete']);

const statusBadgeClass = computed(() => {
  switch (props.task.status) {
    case 'In Progress':
      return 'bg-yellow-200 text-yellow-800';
    case 'Completed':
      return 'bg-green-200 text-green-800';
    case 'Pending':
      return 'bg-blue-200 text-blue-800';
    default:
      return '';
  }
});

function editTask() {
  router.push({ name: 'EditTask', params: { id: props.task.id } });
}

function confirmDelete() {
  emit('delete', props.task.id);
}
</script>