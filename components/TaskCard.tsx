import Link from "next/link";
import { Task } from "../app/page";
import Trash from "../assets/trash.svg";
import Image from "next/image";
import Checkmark from "../assets/checkmark.svg";
import { useRouter } from "next/router";
const TaskCard = ({
  task,
  toggleCompletion,
  deleteTask,
}: {
  task: Task;
  toggleCompletion: Function;
  deleteTask: Function;
}) => {
  return (
    <div
      key={task.id}
      className={`flex items-center justify-between p-4 border rounded shadow-sm drop-shadow-[rgba(0, 0, 0, 0.06)]
       border-[#444444] m-3`}
    >
      <div className="flex items-center gap-2 px-4 py-4">
        <button
          className={`w-[17.45px] h-[17.45px] border-solid  flex justify-center items-center rounded-full ${
            !task.completed ? "border-[#4EA8DE] border-[1px] " : "bg-[#5E60CE]"
          }`}
          onClick={() => toggleCompletion(task)}
        >
          {task.completed && (
            <Image src={Checkmark} width="12" height="12" alt="checkmark" />
          )}
        </button>
        {!task.completed ? (
          <Link
            className={`text-sm cursor-pointer 
              text-[#F2F2F2]
            }`}
            href={`/${task.id}/edit`}
          >
            {task.title}
          </Link>
        ) : (
          <span
            className={`text-sm cursor-pointer  
            line-through text-[#808080]
            }`}
          >
            {task.title}
          </span>
        )}
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:underline"
      >
        <Image src={Trash} width="24" height="24" alt="Trash" />
      </button>
    </div>
  );
};

export default TaskCard;
