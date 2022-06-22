import "./sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/filtersHook";
import {
  addFilter,
  removeFilter,
  setPriceFilterValue,
  setRating,
  setCategories,
} from "../../app/slices/productSlice";

export const Sidebar = () => {
  const {
    products,
    selectedCategories,
    filteredProducts,
    ratingList,
    selectedRating,
    priceFilterValue,
    categoryList,
  } = useSelector((state) => state.products);

  const { getPriceSorted, getRatingSorted, getFiltered, clearFilteredData } =
    useFilters();

  const dispatch = useDispatch();

  const [category, setCategory] = useState([]);
  useEffect(() => {
    products?.map((item) =>
      category.indexOf(item.category) !== -1
        ? null
        : setCategory((prev) => [...prev, item.category])
    );
    const uniqueCategories = [...new Set(category)];
    dispatch(setCategories(uniqueCategories));
  }, [products]);

  useEffect(() => {
    getFiltered({
      selectedCategories,
      products,
      filteredProducts,
      selectedRating,
      priceFilterValue,
    });
  }, [selectedCategories, priceFilterValue, selectedRating]);

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <button className="clear-btn" onClick={() => clearFilteredData()}>
          clear
        </button>
        <h3>Price Filter</h3>
        <label>
          <input
            type="range"
            name="price"
            id="price-filter"
            value={priceFilterValue}
            min={50}
            max={2000}
            onChange={(e) => dispatch(setPriceFilterValue(e.target.value))}
          />
          $. {priceFilterValue}
        </label>
        <h3>Price Sort</h3>
        <label>
          <input
            type="radio"
            name="price-sort"
            onChange={() =>
              getPriceSorted({ action: "low-to-high", data: filteredProducts })
            }
          />{" "}
          Price low-to-high
        </label>
        <label>
          <input
            type="radio"
            name="price-sort"
            onChange={() =>
              getPriceSorted({ action: "high-to-low", data: filteredProducts })
            }
          />{" "}
          Price high-to-low
        </label>
        <h3>Rating Filters</h3>
        <label>
          <input
            type="radio"
            name="rate-sort"
            onChange={() =>
              getRatingSorted({
                action: "popularity",
                data: filteredProducts,
              })
            }
          />{" "}
          Popularity
        </label>
        {ratingList.map((rating, index) => {
          return (
            <label key={index}>
              <input
                type="radio"
                name="rate-sort"
                onChange={() => dispatch(setRating(rating))}
              />{" "}
              {rating} and above
            </label>
          );
        })}

        <h3>Category Filters</h3>

        {categoryList?.map((category, index) => {
          return (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedCategories.some((item) => item === category)}
                onChange={() => {
                  selectedCategories.some((item) => item === category)
                    ? dispatch(removeFilter(category))
                    : dispatch(addFilter(category));
                }}
              />
              {category}
            </label>
          );
        })}
      </div>
    </div>
  );
};
