### 任務管理 API 規格書

這份文件記錄了前後端協作所需的 API 接口細節，以確保資料傳輸的格式與邏輯一致。

#### **基礎 URL**

`http://localhost:3000`

---

#### **1. 取得所有任務**

* **方法**: `GET`
* **路徑**: `/tasks`
* **說明**: 獲取所有任務的列表。
* **排序**: 依據 `lastEdited` 時間從新到舊排列。
* **成功回應 (200 OK)**:
    * **內容**: 包含任務物件的陣列。
    ```json
    [
      {
        "_id": "60c72b2f9b1e8e001c8e8e7c",
        "title": "完成專案文件",
        "content": "撰寫功能規格與技術架構文件。",
        "status": "In Progress",
        "lastEdited": "2025-08-31T12:00:00.000Z"
      },
      ...
    ]
    ```

---

#### **2. 取得單一任務**

* **方法**: `GET`
* **路徑**: `/tasks/:id`
* **說明**: 根據 ID 獲取特定任務。
* **路徑參數**:
    * `id`: `string` - 任務的唯一 ID。
* **成功回應 (200 OK)**:
    * **內容**: 單一任務物件。
    ```json
    {
      "_id": "60c72b2f9b1e8e001c8e8e7c",
      "title": "完成專案文件",
      "content": "撰寫功能規格與技術架構文件。",
      "status": "In Progress",
      "lastEdited": "2025-08-31T12:00:00.000Z"
    }
    ```
* **錯誤回應 (404 Not Found)**:
    * **內容**: 錯誤訊息。
    ```json
    {
      "message": "Task not found"
    }
    ```

---

#### **3. 新增任務**

* **方法**: `POST`
* **路徑**: `/tasks`
* **說明**: 建立一個新任務。
* **請求主體**:
    * **內容**: 包含 `title` 和 `content` 的物件。`status` 預設為 `Pending`，但可選擇性提供。
    ```json
    {
      "title": "新增每日任務",
      "content": "去銀行繳費、買菜。",
      "status": "Pending"
    }
    ```
* **成功回應 (201 Created)**:
    * **內容**: 新建立的任務物件，包含新的 `_id` 和 `lastEdited` 時間。
    ```json
    {
      "_id": "60c72b2f9b1e8e001c8e8e7d",
      "title": "新增每日任務",
      "content": "去銀行繳費、買菜。",
      "status": "Pending",
      "lastEdited": "2025-08-31T12:01:00.000Z"
    }
    ```

---

#### **4. 更新任務**

* **方法**: `PUT`
* **路徑**: `/tasks/:id`
* **說明**: 根據 ID 更新任務的資訊。
* **路徑參數**:
    * `id`: `string` - 任務的 ID。
* **請求主體**:
    * **內容**: 包含要更新的欄位（如 `title`、`content` 或 `status`）。
    ```json
    {
      "title": "更新後的標題",
      "status": "Completed"
    }
    ```
* **成功回應 (200 OK)**:
    * **內容**: 更新後的任務物件。
    ```json
    {
      "_id": "60c72b2f9b1e8e001c8e8e7c",
      "title": "更新後的標題",
      "content": "撰寫功能規格與技術架構文件。",
      "status": "Completed",
      "lastEdited": "2025-08-31T12:02:00.000Z"
    }
    ```
* **錯誤回應 (404 Not Found)**:
    * **內容**: 錯誤訊息。
    ```json
    {
      "message": "Task not found"
    }
    ```

---

#### **5. 刪除任務**

* **方法**: `DELETE`
* **路徑**: `/tasks/:id`
* **說明**: 根據 ID 刪除任務。
* **路徑參數**:
    * `id`: `string` - 任務的 ID。
* **成功回應 (200 OK)**:
    * **內容**: 成功訊息。
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```
* **錯誤回應 (404 Not Found)**:
    * **內容**: 錯誤訊息。
    ```json
    {
      "message": "Task not found"
    }
    ```