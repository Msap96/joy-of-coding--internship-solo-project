// "use client";
// import { useGlobalState } from "@/app/context/globalProvider";
// import React from "react";
// import styled from "styled-components";

// interface Props {
//   content: React.ReactNode;
// }

// function Modal({ content }: Props) {
//   const { closeModal, currentTask } = useGlobalState();

//   const { theme } = useGlobalState();
//   return (
//     <ModalStyled theme={theme}>
//       <div className="modal-overlay" onClick={closeModal}></div>
//       <div className="modal-content">{currentTask && content}</div>
//     </ModalStyled>
//   );
// }

// const ModalStyled = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   z-index: 100;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   .modal-overlay {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100vh;
//     background-color: rgba(0, 0, 0, 0.45);
//     filter: blur(4px);
//   }

//   .modal-content {
//     margin: 0 1rem;

//     padding: 2rem;
//     position: relative;
//     max-width: 630px;
//     width: 100%;
//     z-index: 100;

//     border-radius: 1rem;
//     background-color: ${(props) => props.theme.colorBg2};
//     box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
//     border-radius: ${(props) => props.theme.borderRadiusMd2};

//     @media screen and (max-width: 450px) {
//       font-size: 90%;
//     }
//   }
// `;
"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { TaskData } from "../TaskItem/TaskItem";

const Modal: React.FC = () => {
  const { closeModal, currentTask, allTasks } = useGlobalState();
  var newTask =
    (currentTask?.title == null || currentTask?.title == "") &&
    (currentTask?.description == null || currentTask?.description == "") &&
    (currentTask?.date == null || currentTask?.date == "") &&
    (currentTask?.isCompleted == null || currentTask?.isCompleted == "");
  // Initialize state with currentTask values or default values
  const [taskData, setTaskData] = useState<TaskData>({
    id: currentTask?.id || "",
    title: currentTask?.title || "",
    description: currentTask?.description || "",
    date: currentTask?.date || "",
    isCompleted: currentTask?.isCompleted || false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, type } = e.target;
    let value: string | boolean;

    if (type === "checkbox") {
      // Cast the target to HTMLInputElement to access checked
      value = (e.target as HTMLInputElement).checked;
    } else {
      value = e.target.value;
    }

    setTaskData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newTask) {
        // Create task

        try {
          const res = await axios.post("/api/tasks", taskData);

          if (res.data.error) {
            toast.error(res.data.error);
          }

          if (!res.data.error) {
            toast.success("Task created successfully.");
          }
        } catch (error) {
          toast.error("Something went wrong.");
          console.log(error);
        }
      } else {
        // Update task
        try {
          const res = await axios.put(`/api/tasks/${currentTask.id}`, taskData);

          if (res.data.error) {
            toast.error(res.data.error);
          }

          if (!res.data.error) {
            toast.success("Task updated successfully.");
          }
        } catch (error) {
          toast.error("Something went wrong.");
          console.log(error);
        }
      }
      allTasks();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <ModalStyled>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={taskData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={taskData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="isCompleted">Completed:</label>
            <input
              type="checkbox"
              id="isCompleted"
              checked={taskData.isCompleted}
              onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={closeModal}>
              Close
            </button>
            <button type="submit">
              {newTask ? "Create Task" : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    position: relative;
    max-width: 600px;
    width: 90%;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 101;
    color: #000;

    form {
      display: flex;
      flex-direction: column;

      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #000; /* Set font color to black */
        }

        input,
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          color: #000; /* Set font color to black */
        }

        input[type="checkbox"] {
          margin-top: 0;
        }
      }

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }

        &:first-child {
          background-color: #6c757d;
          &:hover {
            background-color: #5a6268;
          }
        }
      }
    }
  }
`;

export default Modal;
