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
        <h3>Products({filteredProducts?.length})</h3>
        <div className="product-list">
          {loading ? (
            <Loader />
          ) : filteredProducts?.length > 0 ? (
            filteredProducts?.map((item, index) => (
              <ProductCard props={item} key={index} />
            ))
          ) : (
            <h2>No products found</h2>
          )}
        </div>
      </div>
    </div>
  );
};
