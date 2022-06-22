import "./navigation.css";
import { setFilteredProducts } from "../../app/slices/productSlice";
import { useSelector, useDispatch } from "react-redux";

export const Navigation = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const debounce = (cb, delay) => {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => cb.apply(context, args), delay);
    };
  };

  const searchProducts = (query) => {
    const result = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
    );
    console.log(result)
    dispatch(setFilteredProducts(result));
  };

  const handleQuery = debounce((query) => searchProducts(query), 400);
  return (
    <div className="navigation">
      <h2 className="logo">Productkart</h2>
      <input
        type="text"
        className="data-input"
        onChange={(e) => handleQuery(e.target.value)}
        placeholder="Type here..."
      />
    </div>
  );
};
