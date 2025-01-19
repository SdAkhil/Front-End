"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { COLORS } from "../../../utils/COLORS";
import Image from "next/image";
import Arrowleft from "../../../assets/arrow-left.svg";
import Checkmark from "../../../assets/checkmark.svg";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`
        );
        if (!res.ok) {
          throw new Error("Task not found");
        }
        const data = await res.json();
        setTitle(data.title);
        setColor(data.color || "");
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (id) fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color }),
      });
      router.push("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-full h-screen flex bg-[#333333] pt-[66px] p-3">
      <div className="mx-auto md:max-w-[736px] min-[320px]:w-full">
        <button onClick={() => router.back()}>
          <Image src={Arrowleft} width="24" height="24" alt="back" />
        </button>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-12 md:block sm:items-center sm:flex"
        >
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

          <div className="flex flex-col flex-wrap">
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
            <div className="bg-blue-500 text-white px-4 py-2 rounded  flex text-center justify-center  mt-[48px] z-[1000] md:max-w-[736px] min-[320px]:w-full">
              <button
                className="w-full flex text-center justify-center items-center"
                type="submit"
                onClick={handleSubmit}
              >
                Save
                <Image
                  src={Checkmark}
                  width="20"
                  height="20"
                  alt="checkmark"
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
