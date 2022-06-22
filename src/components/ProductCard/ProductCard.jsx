import "./productcard.css";
export const ProductCard = ({ props }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={props.thumbnail} width="130px" height="150px" alt="" />
      </div>
      <div className="product-data">
        <h4 className="product-title">{props.title}</h4>
        <p className="product-price">Price: $. {props.price}</p>
        <p className="product-rating">Rating: {props.rating}</p>
        <button className="add-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};
