

## 依賴
``` bash
npm install
npm i vue-router@4
npm install tailwindcss @tailwindcss/vite
```

組件互動詳解

這個前端應用程式採用了 Vue 3 的 script setup 語法和組合式 API，並透過 vue-router 進行路由管理，同時使用 @ts-rest/core 庫與後端 API 互動。

1. `App.vue` (根組件)
    * 角色： 整個 Vue 應用程式的入口點。它主要負責設定路由視圖 (<router-view>)，並提供一個基本的頁面結構。
    * 互動：
        * 它作為所有其他視圖組件的容器。

2. `TaskList.vue` (視圖組件)
    * 角色： 這是顯示所有任務列表的主要頁面。它處理任務的獲取、篩選、分頁，並協調任務的刪除操作。
    * 互動：
        * 獲取任務： 在組件掛載時 (onMounted)，它會呼叫 taskApiClient.js 中的 client.getTasks() 方法，從後端 API 獲取所有任務資料。
        * 渲染 `TaskCard`： 使用 v-for 迴圈遍歷從後端獲取的任務列表 (paginatedTasks)，為每個任務渲染一個 TaskCard 組件。它將單個 task 物件作為 prop 傳遞給 TaskCard。
        * 處理刪除事件： 監聽每個 TaskCard 組件發出的 @delete 事件。當 TaskCard 上的刪除按鈕被點擊時，TaskList.vue 會執行 confirmDelete 函數，該函數會彈出確認刪除的 Modal。
        * 執行刪除操作： 在確認 Modal 中點擊「確認刪除」後，executeDelete 函數會被呼叫，它會使用 client.deleteTask() 方法（從 taskApiClient.js）向後端發送刪除請求，並傳遞任務的 ID。
        * 更新列表： 任務刪除成功後，它會再次呼叫 fetchTasks() 來刷新任務列表，確保顯示的是最新資料。
        * 導航： 透過 router.push 導航到 AddTask 頁面。

3. `TaskCard.vue` (組件)
    * 角色： 負責顯示單個任務的詳細資訊，例如標題、內容、狀態和上次修改時間。它也提供了編輯和刪除任務的按鈕。
    * 互動：
        * 接收 `task` prop： 從父組件 TaskList.vue 接收一個 task 物件作為屬性。
        * 發出 `delete` 事件： 當用戶點擊刪除按鈕時，它會呼叫 confirmDelete 函數，該函數會發出一個名為 delete 的自定義事件，並將 props.task.id 作為參數傳遞給父組件 TaskList.vue。
        * 導航到編輯頁面： 當用戶點擊編輯按鈕時，它會使用 router.push 導航到 EditTask 頁面，並將 props.task.id 作為路由參數傳遞。

4. `AddTask.vue` (視圖組件)
    * 角色： 提供一個表單，讓用戶輸入新任務的標題、內容和狀態，並將其新增到系統中。
    * 互動：
        * 建立任務： 當用戶提交表單時，它會呼叫 taskApiClient.js 中的 client.createTask() 方法，將新任務的資料發送到後端 API。
        * 導航： 任務新增成功或用戶點擊取消後，它會使用 router.push 導航回 TaskList.vue 頁面。

5. `EditTask.vue` (視圖組件)
    * 角色： 提供一個表單，用於編輯現有任務的詳細資訊。
    * 互動：
        * 獲取任務詳情： 在組件掛載時 (onMounted)，它會從路由參數中獲取任務 ID (route.params.id)，然後呼叫 taskApiClient.js 中的 client.getTask() 方法，從後端 API
            獲取該任務的詳細資料，並填充到表單中。
        * 更新任務： 當用戶提交表單時，它會呼叫 taskApiClient.js 中的 client.updateTask() 方法，將修改後的任務資料發送到後端 API。
        * 導航： 任務更新成功或用戶點擊取消後，它會使用 router.push 導航回 TaskList.vue 頁面。

