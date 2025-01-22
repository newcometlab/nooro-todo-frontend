"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskForm from "@/components/forms/TaskForm";
import { TaskFormData } from "@/lib/form-validations";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import AppHeader from "@/components/AppHeader";
import { useTodoAppContext } from "@/context/TodoAppContext";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id && !Array.isArray(params.id) ? parseInt(params.id) : null;
  const { tasks, isLoading, editTask } = useTodoAppContext();

  const [initialValues, setInitialValues] = useState<TaskFormData | null>(null);

  useEffect(() => {
    if (!taskId) {
      console.error("Invalid task ID");
      router.push("/");
      return;
    }

    const task = tasks.find(t => t.id === taskId)
    if (!task) {
      console.error("Invalid task ID");
      router.push("/");
      return;
    }

    setInitialValues({ title: task.title, color: task.color });
  }, [taskId, tasks, router.push]);

  const handleUpdateTask = async (data: TaskFormData) => {
    const success = await editTask(taskId, data)
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
        {initialValues ? (
          <TaskForm
            defaultValues={initialValues}
            onSubmit={handleUpdateTask}
            buttonLabel="Save"
            isLoading={isLoading}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
}