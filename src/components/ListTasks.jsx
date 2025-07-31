import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDrag, useDrop } from "react-dnd";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [InProgress, setInProgress] = useState([]);
  const [Completed, setCompleted] = useState([]);

  useEffect(() => {
    const ftodos = tasks.filter((task) => task.status === "todos");
    const fInprogress = tasks.filter((task) => task.status === "InProgress");
    const fCompleted = tasks.filter((task) => task.status === "Completed");

    setTodos(ftodos);
    setInProgress(fInprogress);
    setCompleted(fCompleted);
  }, [tasks]);

  const statuses = ["todos", "InProgress", "Completed"];

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center items-start">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          InProgress={InProgress}
          Completed={Completed}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, InProgress, Completed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemtoSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const addItemtoSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks)); 
      toast("Task status changed" , {icon:"😯"})
      return mTasks;
    });
  };

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "InProgress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = InProgress;
  }
  if (status === "Completed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = Completed;
  }

  return (
    <div ref={drop} className={`w-full md:w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};



const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded uppercase text-sm text-white`}
    >
      {text}
      <div className="bg-white ml-2 text-black w-5 h-5 rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
  type: "task",
  item: {id: task.id},
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging()
  })
}))

   console.log(isDragging)

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));

    setTasks(fTasks);
    toast("Task Removed", { icon: "💀" });
  };
  return (
    <div ref={drag} className={`relative shadow-md rounded-md ${isDragging ?"opacity-25":"opacity-100"} cursor-grab p-4 mt-8`}>
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};
