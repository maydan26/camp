interface ListItemProps {
  item: any;
}

const ListItem = (props: ListItemProps) => {
  return (
    <div className="my-4 border-1 border-purple-500/50 rounded-lg">
      <div>{props.item?.attributes?.name}</div>
    </div>
  );
};

export default ListItem;
