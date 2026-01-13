import useItemsList from "../../hooks/useItemsList";
import ItemList from "../ItemsList/ItemList";
import "./gridList.scss";

const GridList = () => {
  const list = useItemsList();

  return (
    <>
      <h3>Grid List:</h3>
      <ul className="grid-list">
        {list.map((item) => (
          <li key={item.id} className="grid-list__item">
            <ItemList itemData={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default GridList;
