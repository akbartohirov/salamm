import React from "react";
import "./HistoryOrders.css";
import axios from "axios";
import BasketOrderItem from "../BasketOrderItem";

const HistoryOrders = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(`/orders/${user.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        const products = res
          .map((item) => [...item.products])
          .flat(1)
          .map((item) => item.productId);
        return products;
      })
      .then((res) => {
        axios
          .post(
            "/products/cart",
            { products: res },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setOrders(res.data);
          })
          .catch((e) => {
            console.log(e.message);
          });
      });
  }, []);

  return (
    <div>
      <div className="history-orders">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <BasketOrderItem key={index} data={order} />
          ))
        ) : (
          <h5>Пока в истории покупок ничего нету</h5>
        )}
      </div>
    </div>
  );
};

export default HistoryOrders;
