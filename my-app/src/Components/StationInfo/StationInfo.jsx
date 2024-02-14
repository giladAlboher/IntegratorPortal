import React, { useState } from "react";
import { BackIconSmall } from "../../Assets/BackIconSmall";
import { v4 as uuidv4 } from 'uuid';
// Other relevant styles that accessed (globally) here from "./StationSelect.css";
import "./StationInfo.css";
import StationInfoLogo from "../../Assets/StationInfoLogo.png";

export const StationInfo = (props) => {
  const { items, setItems, setName } = props;
  const [editMode, setEditMode] = useState(null);
  const [stationName, setStationName] = useState("Your Station Name");
  const [newItem, setNewItem] = useState({
    name: "New PC",
  });
  const [newItemInfo, setNewItemInfo] = useState({
    id: '',
    mainApp: '',
    configTable: '',
    eoMask: '',
    dlMask: '',
    sbcImage: '',
    sbcApps: '',
    additionalInfo: '',
    additionalInfo2: '',
    additionalInfo3: '',
    additionalInfo4: '',
  });
  const [showInfo, setShowInfo] = useState(false);
  
  const handleNameClick = (id) => {
    setEditMode(id);
    // Find the item with the clicked ID and set its name as the current stationName
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setStationName(selectedItem.name);
    }
  };

  const handleNameChange = (event) => {
    setStationName(event.target.value);
  };

  const handleNameBlur = () => {
    setEditMode(null);

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
    setNewItem({ name: "New PC" }); // Clear the newItem after saving
  };

  const handleDeleteItem = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (!isConfirmed) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleShowInfo = (id) => {
    setShowInfo(true);
    console.log(id);
  };
  const handleSaveItemInfo = () => {
    setNewItemInfo((prevItem) => ({
      ...prevItem,
      id: uuidv4(),
    }));

    setShowInfo(false);
  };
  const handleCancelAddNewItem = () => {
    setShowInfo(false);
    setNewItemInfo({
      MainApp: '',
      ConfigTable: '',
      EO_Mask: '',
      DL_Mask: '',
      SBC_IMAGE: '',
      SBC_APPS: '',
    });
  };

  
  return (
    <>
      <div className="station-info-container">
        <button className="add-new-button" onClick={handleSaveNewItem}>
          Add New
        </button>
      <button className="back-btn" onClick={() => setName('')}>
        <BackIconSmall/>
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
                src={StationInfoLogo}
                alt="StationLogo"
                onClick={() => handleShowInfo(item.name)}
                title="" // This is the text that appears when you hover over the image
                onContextMenu={(e) => e.preventDefault()} // This prevents the right-click img menu from appearing
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
      {showInfo && (
        <div className="modal">
          <div className="modal-content">
            <h3>Station Info</h3>
            <div className="input-container">
              <strong>Main_App:</strong>
              <input
                className="edit-input"
                type="text"
                value={newItemInfo.mainApp}
                onChange={(e) => setNewItemInfo({ ...newItemInfo, mainApp: e.target.value })}
              />
            </div>
            <div className="input-container">
              <strong>Config_Table:</strong>
              <input
                className="edit-input"
                type="number"
                value={newItem.configTable}
                onChange={(e) => setNewItemInfo({ ...newItemInfo, configTable: e.target.value })}
              />
            </div>
            <div className="input-container">
              <strong>EO_Mask:</strong>
              <input
                className="edit-input"
                type="text"
                value={newItem.eoMask}
                onChange={(e) => setNewItemInfo({ ...newItemInfo, eoMask: e.target.value })}
              />
            </div>
            <div className="input-container">
              <strong>DL_Mask:</strong>
              <input
                className="edit-input"
                type="text"
                value={newItem.dlMask}
                onChange={(e) => setNewItemInfo({ ...newItemInfo, dlMask: e.target.value })}
              />
            </div>
            <div className="input-container">
              <strong>SBC_Image:</strong>
              <input
                className="edit-input"
                type="text"
                value={newItem.sbcImage}
                onChange={(e) => setNewItemInfo({ ...newItemInfo, sbcImage: e.target.value })}
              />
            </div>
            <div className="input-container">
              <strong>SBC_Apps:</strong>
              <input
                className="edit-input"
                type="text"
                value={newItem.sbcApps}
                onChange={(e) => setNewItemInfo({ ...newItemInfo, sbcApps: e.target.value })}
              />
            </div>
            <div className="input-container">
              <strong>Additional Info:</strong>
              <input
                className="edit-input"
                type="text"
                value={newItem.additionalInfo}
                onChange={(e) => setNewItemInfo({ ...newItemInfo, additionalInfo: e.target.value })}
              />
            </div>
            <div className="input-container">
              <strong>Status:</strong>
              <select
                className="status-dropdown"
                value={newItem.status}
                onChange={(e) => setNewItemInfo({ ...newItem, status: e.target.value })}
              >
                <option value="In Stock">Available</option>
                <option value="Out of Stock">Occupied</option>
                <option value="Backordered">Technical Failure</option>
              </select>
            </div>
            <button className="save-button" onClick={handleSaveItemInfo}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelAddNewItem}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
