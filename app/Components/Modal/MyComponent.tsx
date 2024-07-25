import { SetStateAction, useState } from "react";
import Modal from "./Modal";
import { TaskData } from "../TaskItem/TaskItem";

// function MyComponent() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState<TaskData | undefined>(
//     undefined
//   ); // Optional: For persisting task data

//   const handleOpenModal = (task?: TaskData) => {
//     setCurrentTask(task); // Optional: Store task data if needed
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setCurrentTask(undefined); // Optional: Clear task data
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       {isModalOpen && <Modal task={currentTask} onClose={handleCloseModal} />}
//     </div>
//   );
// }
