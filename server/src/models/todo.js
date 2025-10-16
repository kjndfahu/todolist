import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, default: ""},
        completed: {type: Boolean, default: false},
        completedAt: {type: Date, default: null},
    },
    {timestamps: true}
)

todoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }
});

export const Todo = mongoose.model("Todo", todoSchema)