import "./main.css";
import { useEffect } from "react";
import { ProductCard, Sidebar, Loader } from "..";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../app/slices/productSlice";
export const Main = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className="main">
      <Sidebar />
      <div className="content">
        <h1>Products({filteredProducts?.length})</h1>
        <div className="product-list">
          {loading ? (
            <Loader />
          ) : (
            filteredProducts?.map((item, index) => (
              <ProductCard props={item} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
