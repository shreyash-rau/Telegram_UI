


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import PersonShimmer from './PersonShimmer';
import InputBox from './InputBox';

function ChatMessage() {

    const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { profileUrl, name } = location.state || {};

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3888`
        );
        const data = await response.json();
        setMessages(data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const getHour = (datetime) => {
    let hour = datetime.slice(11, 16);
    let meridian = "AM";
    let hourNumber = parseInt(hour.slice(0, 2), 10);

    if (hourNumber >= 12) {
      meridian = "PM";
      if (hourNumber > 12) {
        hourNumber -= 12;
      }
    } else if (hourNumber === 0) {
      hourNumber = 12;
    }

    let finalHour = `${hourNumber.toString().padStart(2, "0")}:${hour.slice(
      3,
      5
    )}`;
    return `${finalHour} ${meridian}`;
  };

  if (loading) {
    return <PersonShimmer />;
  }

  const formatDate = (inputDate) => {
    const value = inputDate.slice(0, 8);
    const date = new Date(value);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return ` ${month} ${day} , ${year}`;
  };

  return (
    <>
    <div
      className={`custom-chat-container chat-messages-container ${
        theme === "dark" ? "text-dark custom-bg-opacity" : ""
      }`}
    >
      <header
        className={`header d-flex justify-content-between align-items-center  p-1 m-0 sticky-top text-white ${
          theme === "dark" ? "custom-navbar-dark" : "custom-navbar-light"
        }`}
      >
        <div className="d-flex justify-content-between">
          <div>
            <i
              className="bi bi-arrow-left m-2"
              onClick={() => navigate(-1)}
            ></i>

            <img src={profileUrl} alt="Profile" className="custom-profile" />
          </div>
          <div className="ms-3">
            <h5>{name}</h5>
            <h6 className="text-white opacity-75">
              last seen :  {getHour(messages[0].created_at)}
            </h6>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center m-3">
          <div className="custom-chat-message-menu">
            <i className="bi bi-telephone mx-2 "></i>
          </div>
          <div className="custom-chat-message-menu">
            <i className="bi bi-three-dots-vertical mx-2"></i>
          </div>
        </div>
      </header>
      <div className="text-center m-2">
        <span className="text-white bg-secondary px-3 py-1 rounded-5 bg-opacity-50 custom-time-font">
          {formatDate(messages[0].created_at)}
        </span>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="m-1">
            {message.sender.name === "BeyondChat" ? (
              <div className="d-flex justify-content-end">
                <span
                  className={`custom-light-background p-1 custom-message-width d-inline-block w-50 p-2 ${
                    theme === "dark"
                      ? "custom-dark-background"
                      : "custom-light-background"
                  }`}
                >
                  {message.message}
                  <p className="custom-time-font text-end mb-0 opacity-50 text-dark">
                    {getHour(message.created_at)}
                    <i className="bi bi-check-all"></i>
                  </p>
                </span>
              </div>
            ) : (
              <span
                className={` p-1  custom-message-width d-inline-block ms-1 text-center ${
                  theme === "dark" ? "bg-secondary text-white" : "bg-white"
                }`}
              >
                <span className="ms-2">{message.message}</span>
                <span
                  className={`custom-time-font text-end mb-0 ms-4 opacity-50  ${
                    theme === "dark" ? "text-light" : "text-dark"
                  }`}
                >
                  {getHour(message.created_at)}
                </span>
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="fixed-bottom ms-1">
        <InputBox />
      </div>
    </div>

    </>
  )
}

export default ChatMessage












