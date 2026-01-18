const NetworkCallsCounter = (props: { amount: number }) => {
  const { amount } = props;
  return (
    <div className="text-rose-800">
      <div>Network Calls Counter : {amount}</div>
    </div>
  );
};

export default NetworkCallsCounter;
