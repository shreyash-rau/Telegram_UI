// // import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <>

//     </>
//   );
// }

// export default App;


import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import Chats from "./components/Chats";
// import ChatMessages from "./components/ChatMessages";
// import NoChatSelected from "./components/NoChatSelected";
import { useEffect, useState } from "react";

import Chats from './components/Chats.jsx';
import ChatMessage from './components/ChatMessage.jsx';
import ChatSelected from './components/ChatSelected.jsx';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatSelected = location.pathname.includes("/chat/");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile && isChatSelected) {
      navigate(location.pathname);
      navigate(-1);
    }
  }, [isMobile, isChatSelected, navigate, location.pathname]);

  return (
    <div className="app">
      <div
        className={`chats-container ${
          isMobile && isChatSelected ? "d-none" : isMobile ? "" : "col-lg-4"
        }`}
      >
        <Chats />
      </div>
      <div
        className={`chat-messages-container ${
          isMobile && !isChatSelected ? "d-none" : isMobile ? "" : "col-lg-8"
        }`}
      >
        <Routes>
          <Route path="/" element={<ChatSelected />} />
          <Route path="/chat/:chatId" element={<ChatMessage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
