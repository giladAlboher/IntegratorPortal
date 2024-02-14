import React from "react";
import { CircleMenu } from "../../Components/CircleMenu/CircleMenu";
import "./HomePage.css";

export const HomePage = () => {

  const menuItems = [
    { label: "ציוד וחומרה", link: "/inventory-list" },
    { label: "פרויקטים", link: "/project-select" },
    { label: "משימות", link: "/tasks" },
];

  return (
    <>
      <div className="HomePage">
      <CircleMenu items={menuItems}/>
      </div>
    </>
  );
};
