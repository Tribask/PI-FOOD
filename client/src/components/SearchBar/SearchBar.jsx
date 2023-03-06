import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../../redux/actions";
import styles from "./SearchBar.module.css"

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSearch = (value) => {
    dispatch(getRecipeName(value));
  };

  return (
    <div className={styles.search}>
      <input
        type="search"
        // name="result"
        // value={search}
        placeholder="🔍 Find recipes"
        onChange={changeHandler}
      />
      <button onClick={()=>onSearch(search)}>Search</button>
    </div>
  );
};

export default SearchBar;
