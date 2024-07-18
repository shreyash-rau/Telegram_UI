



import React, { useEffect, useState } from 'react'


function useFetchChat() {

  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChats(page);
  }, [page]);

  const fetchChats = async (page) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`
      );
      const data = await response.json();

      if (data.data.data.length === 0) {
        setHasMore(false);
      } else {
        const chatsWithProfileImages = await Promise.all(
          data.data.data.map(async (chat) => {
            const profileResponse = await fetch("https://picsum.photos/200");
            const profileUrl = profileResponse.url;
            return {
              ...chat,
              profileUrl,
            };
          })
        );

        setChats((prevChats) => [...prevChats, ...chatsWithProfileImages]);
      }
    } catch (err) {
      console.log("Error Fetching the data", err);
    } finally {
      setLoading(false);
    }
  };

  return { chats, hasMore, loading, setPage };
}

export default useFetchChat;







