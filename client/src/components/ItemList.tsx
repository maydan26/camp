import type React from "react";
import type { Item } from "../types/types";
import { useEffect, useRef } from "react";

interface ItemListProps {
  data: Item;
}

const ItemList: React.FC<ItemListProps> = ({ data }) => {
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current++;
  });
  return (
    <>
      <p>{`item name: ${data.name}`}</p>
      <p>{`last update: ${data.lastUpdated || "-"}`}</p>
      <p>{`Number of renders: ${renderCounter.current}`}</p>
    </>
  );
};

export default ItemList;
