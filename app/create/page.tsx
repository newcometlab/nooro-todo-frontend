"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/forms/TaskForm";
import { TaskFormData } from "@/lib/form-validations";
import { TASK_COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useTodoAppContext } from "@/context/TodoAppContext";

export default function CreateTaskPage() {
  const router = useRouter();
  const { isLoading, addTask } = useTodoAppContext();

  const handleCreateTask = async (data: TaskFormData) => {
    const success = await addTask(data);

    if (success) router.push("/");
  };

  return (
    <div>
      <AppHeader />
      <div className="max-w-lg mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-gray-400 hover:text-white pl-0"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <TaskForm
          defaultValues={{ title: "", color: TASK_COLORS[0] }}
          onSubmit={handleCreateTask}
          buttonLabel="Add Task"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}