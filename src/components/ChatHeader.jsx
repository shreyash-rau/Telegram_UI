




import React, { useEffect, useState } from 'react';
import logo from "../Images/logo.jpg";
import { useTheme } from './context/ThemeContext';

import RippleButton from "./RippleButton";

function ChatHeader() {
  const { theme, toggleTheme } = useTheme();
  const [dropDownClick, setDropDownClick] = useState(false);


    
  return (
    <>
    <div className="d-flex justify-content-between align-items-center bg-info-subtle">
      <div>
        <button
          className="btn border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
        >
          <i className="bi bi-list fs-4 me-2"></i>
        </button>

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
        >
          <div className="text-end bg-info-subtle ">
            <button
              type="button"
              className="btn-close m-2 border-0"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-header w-100 bg-info-subtle border-bottom">
            <div className="offcanvas-title w-100" id="offcanvasExampleLabel">
              <div className="d-flex justify-content-between w-100">
                <img
                  src={logo}
                  alt="BeyondChats Logo"
                  className="bg-info custom-profile p-2"
                />
                <div onClick={toggleTheme}>
                  <RippleButton />
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <div>
                  <h5>Telegram Chat</h5>
                  <h6>contact.support@telegram.com</h6>
                </div>
                <div className="dropdown mt-3">
                  <button
                    className="btn dropdown-toggle border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    onClick={() => setDropDownClick((prev) => !prev)}
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <div className="offcanvas-body">
            <div>
              <div
                className={`custom-transition ${dropDownClick ? "show" : ""}`}
              >
                <div className="m-2">
                  <span>
                    <img
                      src={logo}
                      alt="BeyondChats_logo"
                      className="bg-info custom-profile p-2"
                    />
                  </span>
                  <span className="ms-2"> Telegram Chats</span>
                </div>
                <div className="m-4 mb-0">
                  <span>
                    <i className="bi bi-plus-lg"></i>
                  </span>
                  <span className="ms-4">Add Account</span>
                </div>
                <hr />
              </div>
              <div className="m-4 mt-0 mb-0">
                <span>
                  <i className="bi bi-person-fill"></i>
                </span>
                <span className="ms-4">My Profile</span>
              </div>
              <hr />
              <div className="m-4">
                <span>
                  <i className="bi bi-people-fill"></i>
                </span>
                <span className="ms-4">New Group</span>
              </div>
              <div className="m-4">
                <span>
                  <i className="bi bi-person-lines-fill"></i>
                </span>
                <span className="ms-4">Contacts</span>
              </div>
              <div className="m-4">
                <span>
                  <i className="bi bi-telephone"></i>
                </span>
                <span className="ms-4">Calls</span>
              </div>
              <div className="m-4">
                <span>
                  <i className="bi bi-person-workspace"></i>
                </span>
                <span className="ms-4">People Nearby</span>
              </div>
              <div className="m-4">
                <span>
                  <i className="bi bi-save2-fill"></i>
                </span>
                <span className="ms-4">Saved Messages</span>
              </div>
              <div className="m-4 mb-0">
                <span>
                  <i className="bi bi-gear"></i>
                </span>
                <span className="ms-4">Settings</span>
              </div>
              <hr />
              <div className="m-4 mt-0">
                <span>
                  <i className="bi bi-person-add"></i>
                </span>
                <span className="ms-4">Invite Friends</span>
              </div>
              <div className="m-4">
                <span>
                  <i className="bi bi-question-circle"></i>
                </span>
                <span className="ms-4">More Features</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 rounded-5 me-2">
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control rounded-5 border-0 bg-transparent"
            placeholder="Search"
          />
          <span className="input-group-text btn text-info fs-5" href="#">
            <i className="bi bi-telegram"></i>
          </span>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default ChatHeader;




