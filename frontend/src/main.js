import { createApp } from 'vue'
import './style.css'  // Tailwind CSS
import App from './App.vue'
import router from './router'; // 從你的路由檔案匯入

const app = createApp(App);

app.use(router); // 將 router 實例加到應用程式中

app.mount('#app');

// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router'; // 從你的路由檔案匯入
// import './index.css'; // 如果你使用了

// const app = createApp(App);

// app.use(router); // 將 router 實例加到應用程式中

// app.mount('#app');