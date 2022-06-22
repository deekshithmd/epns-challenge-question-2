import { filtered, resetFilters } from "../app/slices/productSlice";
import { useDispatch } from "react-redux";

export const useFilters = () => {
  const dispatch = useDispatch();

  const getFiltered = ({ categories, products, rating, priceValue }) => {

    const price = products.filter(
      (item) => Number.parseFloat(item.price) <= Number.parseFloat(priceValue)
    );

    const rate = price.filter(
      (item) => Number.parseFloat(item.rating) >= Number.parseFloat(rating)
    );

    const cat =
      categories?.length > 0
        ? [...rate].filter((item) =>
            categories.some((prod) => prod === item.category)
          )
        : [...rate];

    dispatch(filtered(cat));
  };

  const getPriceSorted = ({ action, data, value }) => {
    const result =
      action === "low-to-high"
        ? [...data].sort((a, b) => a.price - b.price)
        : action === "high-to-low"
        ? [...data].sort((a, b) => b.price - a.price)
        : [...data];
    // : [...data].filter(
    //     (item) => Number.parseFloat(item.price) <= Number.parseFloat(value)
    //   );
    dispatch(filtered(result));
  };

  const getRatingFiltered = ({ action, data, rating }) => {
    const result =
      action === "popularity"
        ? [...data].sort((a, b) => b.rating - a.rating)
        : [...data];

    // [...data].filter(
    //   (item) =>
    //     Number.parseFloat(item.rating) >= Number.parseFloat(rating)
    // );

    dispatch(filtered(result));
  };

  // const getCategoryFiltered = (filters,filteredProducts) => {
  //   const result =
  //     filters.length > 0
  //       ? [...filteredProducts].filter((item) =>
  //           filters.some((prod) => prod === item.category)
  //         )
  //       : [...filteredProducts];
  //   dispatch(filtered(result));
  //   console.log("filters", result);
  // };

  const clearFilters = () => {
    dispatch(resetFilters());
  };

  return {
    getPriceSorted,
    getRatingFiltered,
    // getCategoryFiltered,
    getFiltered,
    clearFilters,
  };
};
