import React, { useContext } from "react";
import { GlobalState } from "../../../../globalState";

export default function Filter() {
  const state = useContext(GlobalState);
  const [categories] = state.productsAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleClick = (e) => {
    setCategory(e.target.id);
    console.log(e.target.id);
  };

  return (
    <div className="filter_menu">
      <div className="filter-row">
        <span id="" onClick={handleClick}>
          All
        </span>
        {categories.map((category) => {
          return (
            <span
              className="cat"
              id={"category=" + category.name}
              key={category._id}
              onClick={handleClick}
            >
              {category.name}
            </span>
          );
        })}
      </div>
      <div className="search-box">
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
        <div className="sort">
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="sort=">Newest</option>
            <option value="sort=oldest">oldest</option>
            <option value="sort=-price">Price: High to low</option>
            <option value="sort=price">Price: low to high</option>
          </select>
        </div>
      </div>
    </div>
  );
}
