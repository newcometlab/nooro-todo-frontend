/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useMemo } from "react";
import { Task } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DocumentTextIcon, PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import AppHeader from "@/components/AppHeader";
import { useTodoAppContext } from "@/context/TodoAppContext";

export default function HomePage() {
  const { tasks, isLoading, toggleComplete, removeTask } = useTodoAppContext();

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])

  const handleToggleComplete = async (task: Task) => {
    await toggleComplete(task)
  };

  const handleDelete = async (deleteTaskId: number | null) => {
    await removeTask(deleteTaskId)
  };

  return (
    <div>
      <AppHeader></AppHeader>

      <Link href="/create" className="block mb-8">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md">
          Create Task{" "}
          <div className="ml-2 bg-blue-500 rounded-full p-1">
            <PlusIcon className="w-4 h-4" />
          </div>
        </Button>
      </Link>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <span className="text-blue-400">Tasks</span>
          <span className="ml-2 bg-[#1a1a1a] px-2 py-1 rounded text-gray-400">
            {isLoading ? "-" : tasks.length}
          </span>
        </div>
        <div>
          <span className="text-purple-400">Completed</span>
          <span className="ml-2 bg-[#1a1a1a] px-2 py-1 rounded text-gray-400">
            {isLoading
              ? "-"
              : !completedCount
                ? 0
                : `${completedCount} of ${tasks.length}`}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <ArrowPathIcon className="w-8 h-8 text-blue-400 animate-spin mb-2" />
          <p className="text-gray-400">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center mt-16">
          <DocumentTextIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            You don't have any tasks registered yet.
          </p>
          <p className="text-gray-500">
            Create tasks and organize your to-do items.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
