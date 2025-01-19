"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLORS } from "../utils/COLORS";
import Arrowleft from "../assets/arrow-left.svg";
import Image from "next/image";
import Plus from "../assets/plus.svg";
export default function CreateTaskPage({
  setIsCreateMode,
}: {
  setIsCreateMode: Function;
}) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("Title is required");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color }),
      });
      setIsCreateMode(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  return (
    <div className="w-full h-full flex justify-center bg-[#333333] pt-[66px]">
      <div className=" mx-auto md:max-w-[736px] min-[320px]:w-full">
        <button onClick={() => setIsCreateMode(false)}>
          <Image src={Arrowleft} width="24" height="24" alt="back" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 mt-12">
          <div>
            <label className="block mb-1 text-[#4EA8DE] text-sm">Title</label>
            <input
              type="text"
              // className="w-full border px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="shadow-[rgba(0, 0, 0, 0.06)] bg-[#444444] rounded-[8px] h-[52px]  mt-3 text-[#F2F2F2] p-4 md:max-w-[736px] min-[320px]:w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="block mb-1 text-[#4EA8DE]">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setColor(c.value);
                  }}
                  className={`w-[52px] h-[52px] rounded-full ${
                    color === c.value && "border-white border-solid border-2"
                  }`}
                  style={{ backgroundColor: c.colorcode }}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="bg-blue-500 text-white px-4 py-2 rounded  text-center mt-[48px] z-[1000] md:max-w-[736px] min-[320px]:w-full">
              <button
                className="w-full flex items-center justify-center"
                type="submit"
                onClick={() => setIsCreateMode(true)}
              >
                Add Task
                <Image
                  src={Plus}
                  width="16"
                  height="16"
                  alt="plus"
                  className="ml-2"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
