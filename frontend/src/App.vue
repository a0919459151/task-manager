<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

// 初始任務資料
const tasks = ref([
  { id: 1, title: '完成網站首頁', content: '設計並實現首頁的 UI 和 UX。', status: 'In Progress', lastEdited: '2025-08-31 15:00:00' },
  { id: 2, title: '準備專案簡報', content: '蒐集資料並製作簡報投影片。', status: 'Pending', lastEdited: '2025-08-30 10:30:00' },
  { id: 3, title: '聯絡客戶', content: '電話確認需求細節。', status: 'Completed', lastEdited: '2025-08-29 09:00:00' },
]);

// 新增任務的方法
function addTask(newTask) {
  const newId = tasks.value.length ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1;
  tasks.value.unshift({  
    ...newTask,
    id: newId,
    lastEdited: new Date().toLocaleString(),
  });
}

// 刪除任務的方法
function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id);
}

// 更新任務的方法
function updateTask(updatedTask) {
  const index = tasks.value.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = {
      ...updatedTask,
      lastEdited: new Date().toLocaleString(),
    };
  }
}

// 透過 provide 將資料和方法提供給所有子元件
provide('tasks', tasks);
provide('addTask', addTask);
provide('deleteTask', deleteTask);
provide('updateTask', updateTask);
</script>
