"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/layer_1.png";
import Clipboard from "../assets/Clipboard.svg";
import TaskCard from "../components/TaskCard";
import CreateTaskPage from "../components/CreateForm";
import Plus from "../assets/plus.svg";

export interface Task {
  id: number;
  title: string;
  color?: string;
  completed: boolean;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isCreateMode]);

  const toggleCompletion = async (task: Task) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          color: task.color,
          completed: !task.completed,
        }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const deleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="h-screen w-full bg-[#333333]  flex flex-col items-center">
      {!isCreateMode && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded  text-center mt-[-20px] z-[1000] flex justify-center md:max-w-[736px] min-[320px]:w-full">
          <button
            className="flex item-center justify-center text-center items-center w-full"
            onClick={() => setIsCreateMode(true)}
          >
            Create Task{" "}
            <Image
              src={Plus}
              width="16"
              height="16"
              alt="plus"
              className="ml-2"
            />
          </button>
        </div>
      )}

      {!isCreateMode && (
        <div className="w-full h-full flex pt-[66px]">
          <div className=" mx-auto min-[320px]:w-full  md:max-w-[736px]">
            <div className="mb-4 flex justify-between">
              <p className="text-[#4EA8DE]">
                Tasks:{" "}
                <span className="bg-[#444444] pt-[2px] pr-2 pb-[2px] pl-2 rounded-[999px] w-[25px] text-center text-[#D9D9D9]">
                  {totalTasks}
                </span>
              </p>
              <p className="text-[#8284FA]">
                Completed:
                <span className="bg-[#444444] pt-[2px] pr-2 pb-[2px] pl-2 rounded-[999px] w-[25px] text-center text-[#D9D9D9]">
                  {completedCount} of {totalTasks}
                </span>
              </p>
            </div>

            <div className="grid gap-4 ">
              {tasks.map((task) => (
                <TaskCard
                  task={task}
                  toggleCompletion={toggleCompletion}
                  deleteTask={deleteTask}
                />
              ))}
              {tasks.length === 0 && (
                <div className="flex justify-center b">
                  <div className=" w-full flex flex-col items-center border-t-[1px] border-[#444444] border-solid rounded-[8px]">
                    <Image
                      src={Clipboard}
                      width="56"
                      height="56"
                      alt="clipboard"
                      className="pt-16"
                    />
                    <div className="pt-4 text-[#808080]">
                      <p>You don't have any tasks registered yet.</p>
                      <p>Create tasks and oragnize your to-do items.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isCreateMode && <CreateTaskPage setIsCreateMode={setIsCreateMode} />}
    </div>
  );
}
