import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todos",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (task.name.length < 3) {
      return toast.error("A task must have more than 3 characters");
    }

    const newTask = { ...task, id: uuidv4() };

    setTasks((prev) => {
      const list = [...prev, newTask];
      localStorage.setItem("tasks", JSON.stringify(list));
      toast.success("Task created");
      return list;
    });

    setTask({ id: "", name: "", status: "todos" }); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full items-start sm:items-center">
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 sm:w-64 px-3 w-full"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, name: e.target.value }) 
        }
      />
      <button
        type="submit"
        className="bg-cyan-500 rounded-md text-white px-4 h-12 w-full sm:w-auto hover:bg-cyan-700"
      >
        Create
      </button>
    </form>
  );
}

export default CreateTask;
