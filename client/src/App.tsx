import { useEffect, useRef, useState, type RefObject } from "react";
import SearchInput from "./components/SearchInput";
import "./App.scss";
import ResultList from "./components/ResultList";
import NetworkCallsCounter from "./components/NetworkCallsCounter";
import useDebounce from "./hooks/useDebounce";
import Footer from "./components/Footer";

function App() {
  const [resultList, setResultList] = useState<{
    input: string;
    page: number[];
    results: Array<any>;
  }>({
    input: "",
    page: [],
    results: [],
  });
  const networkCallsCounterRef: RefObject<number> = useRef<number>(0);

  const fetchSearchResults = async (input: string) => {
    try {
      const response = await fetch(
        `https://api.potterdb.com/v1/characters?filter[name_cont]=${input}&page[size]=5`
      );
      const data = await response.json();

      networkCallsCounterRef.current = networkCallsCounterRef.current + 1;
      const pageData = [
        data.meta.pagination.current,
        data.meta.pagination?.last || data.meta.pagination.current,
      ];
      setResultList({ input: input, page: pageData, results: data.data });
    } catch (error) {
      console.log("Failed to fetch data", error);
    }
  };

  const debounceFetchData = useDebounce(fetchSearchResults, 2000);

  useEffect(() => {
    fetchSearchResults("");
  }, []);

  const setPage = async (page: number) => {
    try {
      const response = await fetch(
        `https://api.potterdb.com/v1/characters?filter[name_cont]=${resultList.input}&page[number]=${page}&page[size]=5`
      );
      networkCallsCounterRef.current = networkCallsCounterRef.current + 1;

      const data = await response.json();
      const pageData = [
        page,
        data.meta.pagination?.last || data.meta.pagination.current,
      ];
      setResultList((prev) => {
        const newResult = { ...prev, results: data.data, page: pageData };
        return newResult;
      });
    } catch (error) {
      console.log("Failed to fetch page ", page);
    }
  };

  return (
    <div className="lists-container">
      <SearchInput handleSearchInput={debounceFetchData} />
      <NetworkCallsCounter amount={networkCallsCounterRef.current} />
      <ResultList items={resultList.results} />
      <Footer
        totalPages={resultList.page[1]}
        currPage={resultList.page[0]}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
