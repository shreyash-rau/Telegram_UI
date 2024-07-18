

import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import useFetchChat from '../hooks/useFetchChat';
import Messages from './Messages';
import { useTheme } from './context/ThemeContext';
import NavTabs from './NavTabs';



function Chats() {
    const { chats, hasMore, loading, setPage } = useFetchChat();
    const navigate = useNavigate();
    const observer = useRef();
    const { theme } = useTheme();

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

    const lastChatElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore, setPage]
    );

    const handleChatClick = (chat) => {
        navigate(`/chat/${chat.id}`, {
            state: {
                profileUrl: chat.profileUrl,
                name: chat.creator.name || "Unknown Number",
            },
        });
    };


    return (
        <>
            <div className="custom-scroll">
                <div className="m-2 w-100">
                    <ChatHeader />
                    <div className="ms-3">
                        <NavTabs />
                    </div>
                    {chats.map((chat, index) => {
                        const uniqueChatKey = `${chat.id}-${index}`;
                        const chatElement = (
                            <div
                                onClick={() => handleChatClick(chat)}
                                className={`d-flex align-items-center w-100 mt-3  rounded-4 p-2 ${theme === "light" ? "custom-white" : "custom-black"
                                    }`}
                                key={uniqueChatKey}
                            >
                                <div className="custom-width-1 ">
                                    <img
                                        src={chat.profileUrl}
                                        alt="Profile"
                                        className="custom-profile"
                                    />
                                </div>
                                <div className="custom-width-2 d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-start flex-column">
                                        <h6>
                                            {chat.creator.name ? chat.creator.name : "Unknown Number"}
                                        </h6>
                                        <h6 className="text-muted">
                                            Hey, Hello! {chat.creator.name || ""}Do u need any assistance ?
                                        </h6>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-end flex-column">
                                        <p className="text-mute mb-2">{getHour(chat.created_at)}</p>
                                        <p
                                            className="badge rounded-5"
                                            style={{ backgroundColor: "#b8b8b8" }}
                                        >
                                            1
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );

                        if (chats.length === index + 1) {
                            return (
                                <div ref={lastChatElementRef} key={uniqueChatKey}>
                                    {chatElement}
                                </div>
                            );
                        }

                        return chatElement;
                    })}
                    {loading &&
                        Array.from({ length: 3 }).map((_, index) => <Messages key={index} />)}
                </div>
            </div>

        </>
    )
}

export default Chats;

