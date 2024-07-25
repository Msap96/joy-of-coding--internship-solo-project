"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios, { all } from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

// Define the shape of the TaskData object
// This is for reference, since it's not TypeScript
// const TaskData = {
//   title: "",
//   description: "",
//   date: "",
//   isCompleted: false,
//   id: 0
// };

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(undefined);
  const [tasks, setTasks] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = (task) => {
    setCurrentTask(task);
    setModal(true);
  };

  const closeModal = () => {
    setCurrentTask(undefined);
    setModal(false);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      const sorted = res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTask = async (task) => {
    try {
      await axios.put(`/api/tasks`, task);
      toast.success("Task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        modal,
        currentTask,
        openModal,
        closeModal,
        allTasks
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};

export const useGlobalUpdate = () => {
  const context = useContext(GlobalUpdateContext);
  if (context === undefined) {
    throw new Error("useGlobalUpdate must be used within a GlobalProvider");
  }
  return context;
};
