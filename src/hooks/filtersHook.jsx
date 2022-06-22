import { setFilteredProducts, clearFilters } from "../app/slices/productSlice";
import { useDispatch } from "react-redux";

export const useFilters = () => {
  
  const dispatch = useDispatch();

  const getFiltered = ({
    selectedCategories,
    products,
    selectedRating,
    priceFilterValue,
  }) => {
    const priceFiltered = products.filter(
      (item) =>
        Number.parseFloat(item.price) <= Number.parseFloat(priceFilterValue)
    );

    const rateFiltered = priceFiltered.filter(
      (item) =>
        Number.parseFloat(item.rating) >= Number.parseFloat(selectedRating)
    );

    const categoryFiltered =
      selectedCategories?.length > 0
        ? [...rateFiltered].filter((product) =>
            selectedCategories.some((category) => category === product.category)
          )
        : [...rateFiltered];

    dispatch(setFilteredProducts(categoryFiltered));
  };

  const getPriceSorted = ({ action, data }) => {
    const sortResult =
      action === "low-to-high"
        ? [...data].sort((a, b) => a.price - b.price)
        : action === "high-to-low"
        ? [...data].sort((a, b) => b.price - a.price)
        : [...data];
    dispatch(setFilteredProducts(sortResult));
  };

  const getRatingSorted = ({ action, data }) => {
    const ratingSortResult =
      action === "popularity"
        ? [...data].sort(
            (product1, product2) => product1.rating - product2.rating
          )
        : [...data];

    dispatch(setFilteredProducts(ratingSortResult));
  };

  const clearFilteredData = () => {
    dispatch(clearFilters());
  };

  return {
    getPriceSorted,
    getRatingSorted,
    getFiltered,
    clearFilteredData,
  };
};
