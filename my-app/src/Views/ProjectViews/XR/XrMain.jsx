import { React } from "react";
import { CircleMenu } from "../../../Components/CircleMenu/CircleMenu";

export const XrMain = () => {
  const backBtn = true;
  const menuItems = [
    { label: "LABS", link: "/xr-labs" },
    { label: "DOCS", link: "/xr-docs" },
  ];

  return (
    <>
      <CircleMenu items={menuItems} backBtn={backBtn} />
    </>
  );
};
