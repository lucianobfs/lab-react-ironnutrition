



function SearchBar(props) {
    return (
      <input
        type="text"
        className="input search-bar"
        name="search"
        placeholder="Search"
        onKeyUp={(event) => {
            return props.filterFoods(event.target.value)
        }}
      />
    );
  }
  
  export default SearchBar;
  