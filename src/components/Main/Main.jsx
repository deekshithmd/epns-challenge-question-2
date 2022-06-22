import "./main.css";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { ProductCard } from "../ProductCard/ProductCard";
import { Sidebar } from "../Sidebar/Sidebar";
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content">
            {filteredProducts?.map((item, index) => (
              <ProductCard props={item} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
