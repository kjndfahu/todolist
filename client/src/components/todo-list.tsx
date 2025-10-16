import { TodoItem } from "./todo-item";
import { Todo } from "../types/todo";

interface TodoListProps {
    todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
    if (todos.length === 0) {
        return <p className="text-center mt-6 text-gray-500">No tasks yet</p>;
    }

    return (
        <div className="flex flex-col w-full gap-3">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};
