import { useEffect, useRef, useState, type RefObject } from "react";
import SearchInput from "./components/SearchInput";
import "./App.scss";
import ResultList from "./components/ResultList";
import NetworkCallsCounter from "./components/NetworkCallsCounter";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [resultList, setResultList] = useState<Array<any>>([]);
  const networkCallsCounterRef: RefObject<number> = useRef<number>(0);

  const fetchSearchResults = async (input: string) => {
    try {
      const response = await fetch(
        `https://api.potterdb.com/v1/characters?filter[name_cont]=${input}`
      );
      const data = await response.json();

      networkCallsCounterRef.current = networkCallsCounterRef.current + 1;
      setResultList(data.data);
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  const debounceFetchData = useDebounce(fetchSearchResults, 2000);

  useEffect(() => {
    fetchSearchResults("");
  }, []);

  return (
    <div className="lists-container">
      <SearchInput handleSearchInput={debounceFetchData} />
      <NetworkCallsCounter amount={networkCallsCounterRef.current} />
      <ResultList items={resultList} />
    </div>
  );
}

export default App;
