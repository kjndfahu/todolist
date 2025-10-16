import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "./search-bar";
import { TodoList } from "./todo-list";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { filterTodos } from "../utils/todoHelpers";
import {fetchTodos} from "../store/thunks/todosThunks";


export const TodoBlock = () => {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const { todos: allTodos, loading, error } = useAppSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const filteredTodos = useMemo(
        () => filterTodos(allTodos, searchQuery),
        [allTodos, searchQuery]
    );

    return (
        <div className="flex flex-col items-center gap-5 p-5 w-[600px]">
            <h2 className="text-3xl text-black font-semibold">Task Manager</h2>
            {error && (
                <div className="w-full p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}
            <SearchBar onSearchChange={setSearchQuery} />
            {loading && allTodos.length === 0 ? (
                <p className="text-center mt-6 text-gray-500">Loading...</p>
            ) : (
                <TodoList todos={filteredTodos} />
            )}
        </div>
    );
};
