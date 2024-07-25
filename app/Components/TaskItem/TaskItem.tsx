"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React, { useState } from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

export interface TaskData {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}

function TaskItem(taskData: TaskData) {
  const { theme, openModal, deleteTask, updateTask, currentTask } =
    useGlobalState();
  return (
    <TaskItemStyled theme={theme}>
      <h1> {taskData.title} </h1>
      <p> {taskData.description} </p>
      <p className="date"> {formatDate(taskData.date)} </p>
      <div className="task-footer">
        {taskData.isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              // const task = taskData
              // task.isCompleted = !task.isCompleted
              // updateTask(task);
              const task = {
                id: taskData.id,
                isCompleted: !taskData.isCompleted,
              };
              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id: taskData.id,
                isCompleted: !taskData.isCompleted,
              };
              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        <button
          className="edit"
          onClick={() => {
            openModal(currentTask);
          }}
        >
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(taskData.id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;
