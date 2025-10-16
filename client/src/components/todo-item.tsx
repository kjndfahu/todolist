import { Check, Pen, Trash, X } from "lucide-react";
import { CustomCheckbox } from "./ui/custom-checkbox";

import { useState } from "react";
import { Todo } from "../types/todo";
import { useAppDispatch } from "../store/hooks";

import {ActionButton} from "./ui/action-button";
import {deleteTodo, toggleTodo, updateTodo} from "../store/thunks/todosThunks";

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedDescription, setEditedDescription] = useState(todo.description);

    const handleSaveEdit = () => {
        if (editedTitle.trim()) {
            dispatch(updateTodo({
                id: todo.id,
                fields: {
                    title: editedTitle,
                    description: editedDescription
                }
            }));
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedTitle(todo.title);
        setEditedDescription(todo.description);
        setIsEditing(false);
    };

    const handleToggle = () => {
        dispatch(toggleTodo(todo.id));
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
                <CustomCheckbox checked={todo.completed} onChange={handleToggle} />
                {isEditing ? (
                    <div className="flex flex-col gap-0.5">
                        <input
                            onChange={(e) => setEditedTitle(e.target.value)}
                            value={editedTitle}
                            placeholder="Write new title"
                            className="text-lg font-medium ring-0 outline-0"
                            type="text"
                        />
                        <input
                            onChange={(e) => setEditedDescription(e.target.value)}
                            value={editedDescription}
                            placeholder="Write new description"
                            className="text-sm text-[#b3b3b3] ring-0 outline-0"
                            type="text"
                        />
                    </div>
                ) : (
                    <div className="space-y-0.5">
                        <h4 className="text-lg font-medium text-black">{todo.title}</h4>
                        <p className="text-sm text-[#b3b3b3]">{todo.description}</p>
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-3">
                {isEditing ? (
                    <>
                        <ActionButton
                            icon={Check}
                            variant="success"
                            onClick={handleSaveEdit}
                            ariaLabel="Save changes"
                        />
                        <ActionButton
                            icon={X}
                            variant="delete"
                            onClick={handleCancelEdit}
                            ariaLabel="Cancel editing"
                        />
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="cursor-pointer"
                            aria-label="Edit todo"
                        >
                            <Pen className="w-5 h-5" color="#3182ce" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="cursor-pointer"
                            aria-label="Delete todo"
                        >
                            <Trash className="w-5 h-5" color="#ff0000" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};