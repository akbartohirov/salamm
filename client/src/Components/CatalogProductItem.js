import React from "react";
import { Link } from "react-router-dom";
import "./CatalogProductItem.css";

const CatalogProductItem = ({ data, ownstyle }) => {
  const basketHandler = (e) => {
    let addedProduct = JSON.parse(localStorage.getItem("salamBasket"));

    if (!addedProduct) {
      localStorage.setItem(
        "salamBasket",
        JSON.stringify([
          {
            productId: data._id,
            img: data.img,
            title: data.title,
            quantity: 1,
            price: data.sellPrice,
            amount: data.amount,
          },
        ])
      );
      window.M.toast({ html: "Продукт добавлен", classes: "loginToast" });
      return;
    } else {
      const productIds = addedProduct.map((item) => item.productId);
      if (addedProduct && productIds.includes(data._id)) {
        window.M.toast({
          html: "Продукт уже существует в ввшем корзине",
          classes: "loginToastYellow",
        });
        return;
      } else if (addedProduct && !productIds.includes(data._id)) {
        addedProduct.push({
          productId: data._id,
          img: data.img,
          title: data.title,
          quantity: 1,
          price: data.sellPrice,
          amount: data.amount,
        });
        localStorage.setItem("salamBasket", JSON.stringify(addedProduct));
        window.M.toast({ html: "Продукт добавлен", classes: "loginToast" });
      }
    }
  };

  const formatter = new Intl.NumberFormat();

  return (
    <div style={ownstyle && ownstyle}>
      <div className="card card-cont">
        <div
          className="card-image"
          style={{ height: "180px", overflow: "hidden", position: "relative" }}
        >
          <img
            style={{
              height: "100%",
              width: "auto",
              padding: "20px",
              marginTop: "20px",
            }}
            src={`/${data.img[0].path}`}
            alt="product img"
          />
        </div>
        <div className="card-content">
          <Link
            to={`/product/${data._id}`}
            className="card-title prodcuct-card-title "
            style={{ cursor: "pointer", color: "#000" }}
          >
            {data.title}
          </Link>
          <p
            style={{ textAlign: "right", fontWeight: "600", fontSize: "20px" }}
          >
            {formatter.format(data.sellPrice)} сум
          </p>
        </div>
        <div className="card-action">
          <button
            className="btn waves-effect"
            onClick={(e) => basketHandler(e)}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogProductItem;
