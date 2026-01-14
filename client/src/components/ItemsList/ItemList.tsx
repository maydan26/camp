import React, { useState } from "react";
import type { Item } from "../../types/types";
import { useLayoutEffect, useRef } from "react";
import "./itemList.scss";

interface ItemListProps {
  itemData: Item;
}

const compareProps = (
  oldProps: ItemListProps,
  newProps: ItemListProps
): boolean => {
  return oldProps.itemData.name === newProps.itemData.name;
};

const ItemList: React.FC<ItemListProps> = React.memo(({ itemData }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const renderCounter = useRef(0);
  renderCounter.current++;

  useLayoutEffect(() => {
    if (itemData.lastUpdated) {
      let sum = 0;
      for (let i = 0; i < 500000000; i++) {
        sum += Math.sqrt(i);
      }

      setIsHighlighted(true);
      const timeoutId = setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);

      return () => {
        console.log("clear");
        clearTimeout(timeoutId);
      };
    }
  }, [itemData.lastUpdated]);

  return (
    <div className={isHighlighted ? "item-highlighted" : "item"}>
      <p>{`item name: ${itemData.name}`}</p>
      <p>{`last update: ${itemData.lastUpdated || "-"}`}</p>
      <p>{`Number of renders: ${renderCounter.current}`}</p>
    </div>
  );
}, compareProps);

export default ItemList;
