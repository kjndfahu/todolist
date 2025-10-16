import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { useDebounce } from "../hooks/useDebounce";
import {addTodo} from "../store/thunks/todosThunks";

interface SearchBarProps {
    onSearchChange: (query: string) => void;
}

export const SearchBar = ({ onSearchChange }: SearchBarProps) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        onSearchChange(debouncedSearchQuery);
    }, [debouncedSearchQuery, onSearchChange]);

    const handleAddTodo = () => {
        if (title.trim()) {
            dispatch(addTodo({ title, description }));
            setTitle("");
            setDescription("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex items-center justify-between p-4 w-full rounded-lg shadow-lg border-gray-200 border">
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find your task..."
                    className="text-md w-full outline-0 ring-0"
                    type="text"
                />
                <Search className="w-5 h-5" color="#b3b3b3" />
            </div>
            <div className="flex items-center gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Title"
                    className="flex-1 text-md outline-0 ring-0 border p-2 rounded"
                    type="text"
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Description"
                    className="flex-1 text-md outline-0 ring-0 border p-2 rounded"
                    type="text"
                />
                <button
                    onClick={handleAddTodo}
                    className="text-white text-lg bg-blue-600 hover:bg-blue-800 rounded-lg px-6 py-2"
                    type="button"
                >
                    Add task
                </button>
            </div>
        </div>
    );
};