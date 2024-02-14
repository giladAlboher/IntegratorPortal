import { React } from 'react';
import { useState } from 'react';   
import { StationSelect } from '../../../Components/StationSelect/StationSelect';
import {StationInfo } from '../../../Components/StationInfo/StationInfo';
import { LabSelect } from '../../../Components/LabSelect/LabSelect';

export const XrLabs= () => {
    const [labItems, setLabItems] = useState([{ id: 1, name: 'Lab-102' }]);// Send the information to the LabSelect component
    const [items, setItems] = useState([{ id: 1, name: 'New Station' }]);// Send the information to the StationSelect component
    const [items2, setItems2] = useState([{ id: 1, name: 'New PC' }]);// Send the information to the StationInfo component

    const [labName, setLabName] = useState('');
    const [stationTitleName, setStationTitleName] = useState('');


    return (
        <>
        <div className='page-content'>
        <h1 style={{ textAlign: "center" }}>XR LABS</h1>
            {labName && <h2 style={{ textAlign: 'center' }}>Lab Selected: {labName}</h2>} 
            {stationTitleName && <h2 style={{ textAlign: 'center' }}>Station Selected: {stationTitleName}</h2>} 
            {/*  pages content based on states of labName and stationTitleName */ }
            {!labName && <LabSelect items={labItems} setItems={setLabItems} setName={setLabName}/>}
            { labName && !stationTitleName && <StationSelect items = {items} setItems = {setItems} setName={setStationTitleName} labNameRemove = {setLabName}/>}
            { stationTitleName && <StationInfo items={items2} setItems={setItems2} setName = {setStationTitleName}/>}
        </div>
        </>
    );
}
