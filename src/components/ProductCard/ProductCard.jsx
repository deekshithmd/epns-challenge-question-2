import "./productcard.css";
export const ProductCard = ({ props }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={props.thumbnail} width="130px" height="150px" alt="" />
      </div>
      <div className="product-data">
        <h4 className="product-title">{props.title}</h4>
        <p>$. {props.price}</p>
        <p>Rating: {props.rating}</p>
      </div>
    </div>
  );
};
