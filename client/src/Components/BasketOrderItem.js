import React from "react";
import "./BasketOrderItem.css";

const BasketOrderItem = ({ data, deleteHandler, quantityHandler }) => {
  return (
    <div className="row basket-item mb-2">
      <div className="col s2 order-image-box ml-1 flexed ">
        <img
          className="order-image"
          alt="product img"
          src={data?.img[0].path}
        />
      </div>
      <div className="col s4 order-title">
        <p>{data.title}</p>
      </div>
      <div className="order-quantity col s2 flexed">
        <select
          className="browser-default basket-select"
          value={data.quantity}
          onChange={(e) => quantityHandler(e, data.productId)}
        >
          <option value="шт." disabled defaultChecked>
            шт.
          </option>
          {[...Array(data.amount).keys()].map((el) => (
            <option key={el + 1} value={el + 1}>
              {el + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="order-price col s3 flexed">
        <h4>{data.price}$</h4>
      </div>
      {deleteHandler && (
        <div
          onClick={deleteHandler && ((e) => deleteHandler(e, data.productId))}
          className="order-delete col s1 flexed"
        >
          <i className="fas fa-trash-alt delete"></i>
        </div>
      )}
    </div>
  );
};

export default BasketOrderItem;
