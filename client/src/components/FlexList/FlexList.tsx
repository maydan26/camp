import useItemsList from "../../hooks/useItemsList";
import ItemList from "../ItemsList/ItemList";
import "./flexList.scss";

const FlexList = () => {
  const list = useItemsList();

  return (
    <>
      <h3>Flex List:</h3>
      <ul className="flex-list">
        {list.map((item) => (
          <li key={item.id} className="flex-list__item">
            <ItemList itemData={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FlexList;
