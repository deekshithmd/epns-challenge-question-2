import "./sidebar.css";
import { useFilters } from "../../hooks/filtersHook";
import {
  setFilter,
  removeFilter,
  setPriceValue,
  setRating,
  setCategories,
} from "../../app/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const {
    products,
    categories,
    filteredProducts,
    ratings,
    rating,
    priceValue,
    categoryNames,
  } = useSelector((state) => state.products);

  const { getPriceSorted, getRatingFiltered, getFiltered, clearFilters } =
    useFilters();

  const dispatch = useDispatch();

  const [cat, setCat] = useState([]);
  useEffect(() => {
    products?.map((item) =>
      cat.indexOf(item.category) !== -1
        ? null
        : setCat((prev) => [...prev, item.category])
    );
    const re = [...new Set(cat)];
    dispatch(setCategories(re));
  }, [products]);

  useEffect(() => {
    getFiltered({ categories, products, filteredProducts, rating, priceValue });
  }, [categories, priceValue, rating]);

  return (
    <div className="filter-bar">
      <button className="clear-btn" onClick={() => clearFilters()}>
        clear
      </button>
      <label>
        <input
          type="range"
          name="price"
          id="price-filter"
          value={priceValue}
          min={50}
          max={2000}
          onChange={(e) => dispatch(setPriceValue(e.target.value))}
        />
        $. {priceValue}
      </label>
      <h3>Price based</h3>
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
      <h3>Rating based</h3>
      <label>
        <input
          type="radio"
          name="rate-sort"
          onChange={() =>
            getRatingFiltered({ action: "popularity", data: filteredProducts })
          }
        />{" "}
        Popularity
      </label>
      {ratings.map((rating, index) => {
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

      {categoryNames?.map((category, index) => {
        return (
          <label key={index}>
            <input
              type="checkbox"
              checked={categories.some((item) => item === category)}
              onChange={() => {
                categories.some((item) => item === category)
                  ? dispatch(removeFilter(category))
                  : dispatch(setFilter(category));
              }}
            />
            {category}
          </label>
        );
      })}
      {/* <label>
        <input
          type="checkbox"
          checked={categories.some((item) => item === "laptops")}
          onChange={() => {
            categories.some((item) => item === "laptops")
              ? dispatch(removeFilter("laptops"))
              : dispatch(setFilter("laptops"));
          }}
        />
        laptops
      </label> */}
      {/* <label>
        <input
          type="checkbox"
          checked={categories.some((item) => item === "smartphones")}
          onChange={() => {
            categories.some((item) => item === "smartphones")
              ? dispatch(removeFilter("smartphones"))
              : dispatch(setFilter("smartphones"));
          }}
        />
        Mobiles
      </label>
      <label>
        <input
          type="checkbox"
          checked={categories.some((item) => item === "groceries")}
          onChange={() => {
            categories.some((item) => item === "groceries")
              ? dispatch(removeFilter("groceries"))
              : dispatch(setFilter("groceries"));
          }}
        />
        groceries
      </label>
      <label>
        <input
          type="checkbox"
          checked={categories.some((item) => item === "home-decoration")}
          onChange={() => {
            categories.some((item) => item === "home-decoration")
              ? dispatch(removeFilter("home-decoration"))
              : dispatch(setFilter("home-decoration"));
          }}
        />
        Home decoration
      </label>
      <label>
        <input
          type="checkbox"
          checked={categories.some((item) => item === "fragrances")}
          onChange={() => {
            categories.some((item) => item === "fragrances")
              ? dispatch(removeFilter("fragrances"))
              : dispatch(setFilter("fragrances"));
          }}
        />
        fragrances
      </label>
      <label>
        <input
          type="checkbox"
          checked={categories.some((item) => item === "skincare")}
          onChange={() => {
            categories.some((item) => item === "skincare")
              ? dispatch(removeFilter("skincare"))
              : dispatch(setFilter("skincare"));
          }}
        />
        Skin care
      </label> */}
    </div>
  );
};
