import React, { useState, useEffect } from "react";
import "./Product.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import SlickCard from "../Components/SlickCard";

const Product = () => {
  const [product, setProduct] = useState(null);

  const params = useParams();

  useEffect(() => {
    axios.get(`/products/${params.id}`).then((res) => {
      setProduct(res.data);
    });
  }, [params.id]);

  const basketHandler = (e) => {
    let addedProduct = JSON.parse(localStorage.getItem("salamBasket"));

    if (!addedProduct) {
      localStorage.setItem(
        "salamBasket",
        JSON.stringify([
          {
            productId: product._id,
            img: product.img,
            title: product.title,
            quantity: 1,
            price: product.sellPrice,
            amount: product.amount,
          },
        ])
      );
      window.M.toast({ html: "Продукт добавлен", classes: "loginToast" });
      return;
    } else {
      const productIds = addedProduct.map((item) => item.productId);
      if (addedProduct && productIds.includes(product._id)) {
        window.M.toast({
          html: "Продукт уже существует в ввшем корзине",
          classes: "loginToastYellow",
        });
        return;
      } else if (addedProduct && !productIds.includes(product._id)) {
        addedProduct.push({
          productId: product._id,
          img: product.img,
          title: product.title,
          quantity: 1,
          price: product.sellPrice,
          amount: product.amount,
        });
        localStorage.setItem("salamBasket", JSON.stringify(addedProduct));
        window.M.toast({ html: "Продукт добавлен", classes: "loginToast" });
      }
    }
  };

  return (
    <div className="container mt-3 mb-3">
      <div className="row">
        <div className="product-carousel col s12 m7 l8">
          <SlickCard images={product && product.img} />
        </div>
        <div className="product-action col s12 m5 l4">
          <span className="product-articul">Арт. тов. 123456789</span>
          <span className="product-title">{product && product.title}</span>
          <span className="product-price">
            {product && product.sellPrice} сум
          </span>
          <span
            className="product-button btn btn-primary"
            onClick={(e) => basketHandler(e)}
          >
            В корзину
          </span>
        </div>
      </div>
      <div className="row product-description">
        <h4>Характеристики товара</h4>
        <table className="striped">
          <tbody>
            {product &&
              product.description.split(",").map((desc, index) => (
                <tr key={index}>
                  <td>{desc}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
