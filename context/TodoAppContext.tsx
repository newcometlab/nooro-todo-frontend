"use client";

import { TaskFormData } from "@/lib/form-validations";
import { createTask, deleteTask, getTasks, sortTasks, updateTask } from "@/lib/services";
import { Task } from "@/lib/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface TodoAppContextType {
    tasks: Task[]
    isLoading: boolean
    fetchTasks: () => Promise<void>
    toggleComplete: (task: Task) => Promise<void>
    removeTask: (deleteTaskId: number | null) => Promise<void>
    addTask: (data: TaskFormData) => Promise<boolean>
    editTask: (taskId: number | null, data: TaskFormData) => Promise<boolean>
}

const TodoAppContext = createContext<TodoAppContextType | undefined>(undefined);

export const TodoAppProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTasks = async () => {
        setIsLoading(true);

        try {
            const data = await getTasks();
            const sortedTasks = sortTasks(data);
            setTasks(sortedTasks);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch tasks. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleComplete = async (task: Task) => {
        try {
            const updated = await updateTask(task.id, { completed: !task.completed });
            setTasks((prev) => {
                const updatedTasks = prev.map((t) => (t.id === task.id ? updated : t));
                return sortTasks(updatedTasks);
            });
        } catch (error) {
            console.error(error);
            alert("Failed to update task. Please try again.");
        }
    };

    const removeTask = async (deleteTaskId: number | null) => {
        if (!deleteTaskId) return;

        setIsLoading(true);
        try {
            await deleteTask(deleteTaskId);
            await fetchTasks()
        } catch (error) {
            console.error(error);
            alert("Failed to delete task. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const addTask = async (data: TaskFormData) => {
        setIsLoading(true);

        let success = false;
        try {
            await createTask(data);
            await fetchTasks()
            success = true;
        } catch (error) {
            console.error(error);
            alert("Failed to create task. Please try again later.");
            success = false;
        } finally {
            setIsLoading(false);
        }

        return success
    };

    const editTask = async (taskId: number | null, data: TaskFormData) => {
        if (!taskId) return false;

        setIsLoading(true);
        let success = false;
        try {
            await updateTask(taskId, data);
            await fetchTasks()
            success = true;
        } catch (error) {
            console.error(error);
            alert("Failed to update task. Please try again later.");
            success = false;
        } finally {
            setIsLoading(false);
        }

        return success
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TodoAppContext.Provider value={{ tasks, isLoading, fetchTasks, toggleComplete, removeTask, addTask, editTask }}>
            {children}
        </TodoAppContext.Provider>
    );
};

export const useTodoAppContext = () => {
    const context = useContext(TodoAppContext);
    if (!context) {
        throw new Error("useTodoAppContext must be used within an TodoAppProvider");
    }
    return context;
};
