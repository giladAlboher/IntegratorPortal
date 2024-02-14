// Styles for the LabSelect component are in the StationSelect.css file
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import LabLogo from "../../Assets/labs-icon.png";
import { Msg } from "../Msg/Msg";
import { BackIconSmall } from "../../Assets/BackIconSmall";


export const LabSelect = (props) => {
  const { items, setItems, setName } = props; // Make the items and setItems props available
  const [editMode, setEditMode] = useState(null);
  const [stationName, setStationName] = useState("Your Station Name");
  const [newItem, setNewItem] = useState({
    name: "New Lab",
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  
  const handleNameClick = (id) => {
    setEditMode(id);
    // Find the item with the clicked ID and set its name as the current stationName
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setStationName(selectedItem.name);
    }
  };

  const handleNameChange = (event) => {
    if (event.target.value.length > 15) {
      setIsError(true);
      setMsg("Name is too long");
      setTimeout(() => {
        setMsg("");
      }, 3000);
      return;
    }
    if (event.target.value.length < 1) {
      setIsError(true);
      setMsg("Name is too short");
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
    setStationName(event.target.value);
  };

  const handleNameBlur = () => {
    setEditMode(null);
    console.log("Save the new name: ", stationName);
    // Update the item's name in the state
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editMode ? { ...item, name: stationName } : item
      )
    );
  };

  const handleSaveNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: uuidv4(),
        name: newItem.name,
      }
    ]);
    console.log(items);
    setNewItem({ name: "New Lab" }); // Clear the newItem after saving
  };

  const handleDeleteItem = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (!isConfirmed) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSelectedItem = (item) => {
    setName(item);
  };
  return (
    <>
      <div className="station-select-container">
        <div className="popup-msg-labs"> 
         {msg&&<Msg msg={msg} isError={isError}/>}
        </div>
        <button className="add-new-button" onClick={handleSaveNewItem}>
          Add New
        </button>
        <div className="station-box">
          {items.map((item) => (
            <li key={item.id} className="">
              <span
                className="delete-icon"
                onClick={() => handleDeleteItem(item.id)}
              >
                &#x2716; {/* "X" character */}
              </span>
              {/* <Link to={{ pathname: `${item.name}` }}> */}
              <img
                className="ws-logo"
                src={LabLogo}
                alt="StationLogo"
                onClick={() => handleSelectedItem(item.name)}
                title=""
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* </Link>  */}

              {editMode === item.id ? (
                <input
                  className="station-name-input"
                  type="text"
                  value={stationName}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                />
              ) : (
                <div
                  className="station-name"
                  onClick={() => handleNameClick(item.id)}
                >
                  {item.name}
                </div>
              )}
            </li>
          ))}
        </div>
    
      </div>
    </>
  );
};
