import { useState, useEffect } from "react";
import "./App.css";
import type { Item } from "./types/types";
import ItemList from "./components/ItemList.tsx";
import { socket } from "./socket.ts";
import axios from "axios";

function App() {
  const [list, setList] = useState<Array<Item>>([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/list");
        console.log("got ", { res });
        setList(res.data);
      } catch (error) {
        console.log("Failed fetch List", error);
      }
    };

    fetchList();
    socket.emit("subscribe", "foo");

    socket.on("update", (data) => {
      setList((prevList) =>
        prevList.map((el) => (el.id === data.id ? data : el))
      );
    });

    return () => {
      socket.emit("unsubscribe", "foo");
      socket.off("update");
    };
  }, []);

  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <ItemList data={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
