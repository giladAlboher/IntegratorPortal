import React from "react";
import { useState } from "react";
import { CircleMenu } from "../../Components/CircleMenu/CircleMenu";
import { Link, useParams } from "react-router-dom"; // Import Link from React Router
import './ProjectSelect.css';

export const ProjectSelect = (props) => {

  
  const backBtn = true; 
  const menuItems = [
      { label: "XR", link: "/xr-main" },
      { label: "LITE", link: "/lite-labs" },
      { label: "BB", link: "/bb-labs" },
      { label: "Hydration", link: "/hyd-labs" },
  ];
  
    return (
      <>
       <CircleMenu items={menuItems} backBtn={backBtn}/>
      </>
    );
};
