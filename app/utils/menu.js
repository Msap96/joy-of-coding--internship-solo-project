import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
  },  
  {
    id: 2,
    title: "Do It Now",
    icon: todo,
    link: "/incomplete",
  },
  {
    id: 3,
    title: "Important!",
    icon: list,
    link: "/important",
  },
  {
    id: 4,
    title: "Completed!",
    icon: check,
    link: "/completed",
  },

];

export default menu;