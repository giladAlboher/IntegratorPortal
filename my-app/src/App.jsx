import './App.css';
import { React, useState, useEffect } from 'react';
import { CustomNavLink } from './Components/CustomNavLink/CustomNavLink';
import { Route, Routes } from "react-router-dom";
import { HomePage } from './Views/HomePage/HomePage';
import { AboutPage } from './Views/AboutPage/AboutPage';
import { NotFound } from './Views/NotFound/NotFound';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';
import { InventoryList } from './Views/InventoryList/InventoryList';
import { Modal } from './Components/Modal/Modal';
import { Login } from './Components/Login/Login';
import { SignUp } from './Components/SignUp/SignUp';
import { ProjectSelect } from './Views/ProjectSelect/ProjectSelect';
import { TasksPage } from './Views/TasksPage/TasksPage';
import { XrMain } from './Views/ProjectViews/XR/XrMain';
import { XrLabs } from './Views/ProjectViews/XR/XrLabs';
const App = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);



  useEffect(() => {
    showModal && setShowLogin(true);
  }, [showModal]);



  const handleModal = () => {
    setShowModal(!showModal);
  };



  return (
    <div className="App">
      <header className="App-header">
       <nav className="nav-links">
        <div className="nav-left">
          <ul>
          <li><CustomNavLink to="/home">Home</CustomNavLink></li>
          </ul>
        </div>
        <div className='nav-right'>
        <ul>
        <li onClick={handleModal}><CustomNavLink to="">Login</CustomNavLink></li>
        </ul>
        <ul>
        <li><CustomNavLink to="/profile">Profile</CustomNavLink></li>
        </ul>
        <ul>
        <li><CustomNavLink to="/about">About</CustomNavLink></li>
        </ul>
        </div>
       </nav>
      </header>

      <main>
        <section className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/inventory-list" element={<InventoryList />} />
            <Route path="/project-select" element={<ProjectSelect />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="*" element={<NotFound />} />
            { /* Workstations Links */ }
            <Route path="/xr-main" element={<XrMain/>} />
            <Route path="/xr-labs" element={<XrLabs/>} />
          </Routes>
          {showModal && (
            <Modal showModal={showModal} setShowModal={setShowModal} >
              {showLogin && (
                <Login showLogin={showLogin} setShowLogin={setShowLogin} showSuccessMsg={showSuccessMsg} setShowSuccessMsg={setShowSuccessMsg} setShowModal={setShowModal} />
              )}
              <SignUp showLogin={showLogin} setShowLogin={setShowLogin} setShowSuccessMsg={setShowSuccessMsg} />
            </Modal>
          )}
        </section>
      </main>
{/*       <footer>
        <p>© 2023 Oz Alboher</p>
      </footer> */}
    </div>
  );
}

export default App;

