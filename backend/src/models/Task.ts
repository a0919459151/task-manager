import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: false },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
}, {
    // 啟用時間戳記，Mongoose 會自動新增 createdAt 和 updatedAt 欄位。
    timestamps: { createdAt: true, updatedAt: true },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
