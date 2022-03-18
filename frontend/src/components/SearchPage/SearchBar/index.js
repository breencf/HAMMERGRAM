import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchVal } from "../../../store/search";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  // const searchValue = useSelector((state)=> state.searchReducer)
  const handlesubmit = async (e) => {
    e.preventDefault();

    await dispatch(searchVal(name));
  };

  window.searchName = name;

  return (
    <div id="search">
      <FaSearch id="search-icon" />
      <form onSubmit={handlesubmit}>
        <input
          onChange={(e) => {
            setName(e.target.value);
            if(e.target.value.length > 2) dispatch(searchVal(e.target.value));
          }}
          placeholder="Artists, songs, or playlists"
          value={name}
          type="text"
          name="name"
        />
      </form>
    </div>
  );
};

export default SearchBar;
