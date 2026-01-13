import React from "react";
import type { Item } from "../../types/types";
import { useEffect, useRef } from "react";

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
  const renderCounter = useRef(0);
  renderCounter.current++;
  return (
    <>
      <p>{`item name: ${itemData.name}`}</p>
      <p>{`last update: ${itemData.lastUpdated || "-"}`}</p>
      <p>{`Number of renders: ${renderCounter.current}`}</p>
    </>
  );
}, compareProps);

export default ItemList;
