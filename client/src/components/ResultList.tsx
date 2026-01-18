import ListItem from "./ListItem";

interface ResultListProp {
  items: any[];
}

const ResultList = (props: ResultListProp) => {
  const { items } = props;

  return (
    <div>
      {items?.map((item) => (
        <ListItem key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default ResultList;
