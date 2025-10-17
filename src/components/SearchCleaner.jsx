import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import NextStepContext from "../context/NextStepContext";

const SearchCleaner = () => {
  const location = useLocation();
  const { setSearch, setShow } = useContext(NextStepContext);

  useEffect(() => {
    setSearch("");
    setShow(false);
  }, [location]);

  return null;
};

export default SearchCleaner;
