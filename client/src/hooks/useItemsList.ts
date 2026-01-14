import { useState, useEffect } from "react";
import { socket } from "../socket/socket";
import type { Item } from "../types/types";
import axios from "axios";

const useItemsList = () => {
  const [itemsList, setItemsList] = useState<Array<Item>>([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/list");
        console.log("got ", { res });
        setItemsList(res.data);
      } catch (error) {
        console.log("Failed fetch List", error);
      }
    };

    fetchList();
    socket.emit("subscribe", "list-updates");

    socket.on("update", (data) => {
      setItemsList((prevList) =>
        prevList.map((el) => (el.id === data.id ? data : el))
      );
    });

    return () => {
      socket.emit("unsubscribe", "list-updates");
      socket.off("update");
    };
  }, []);

  return itemsList;
};

export default useItemsList;
