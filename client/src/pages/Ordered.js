import axios from "axios";
import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Ordered = () => {
  const [order, setOrder] = React.useState({});
  const [error, setError] = React.useState({});
  const { id } = useParams();

  const history = useHistory();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/orders/exact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrder(res.data);
        window.M.updateTextFields();
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://checkout.paycom.uz/api`,
        {},
        {
          headers: {
            Authorization: `X-Auth `,
          },
        }
      )
      .then((res) => console.log(res.data));
  };

  const cencelOrder = (e, id) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.M.toast({
          html: "Заказ успешно отменен",
          classes: "loginToast",
        });
        history.push("/basket");
      })
      .catch((e) => {
        window.M.toast({
          html: "Что прошло не так",
          classes: "loginToastRed",
        });
      });
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="payme card"
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "30px",
        }}
      >
        <img
          src="https://cdn.paycom.uz/documentation_assets/power-by-Payme.svg"
          alt="payme"
          style={{ height: "80px", margin: "0 auto" }}
        />
        <div className="row">
          <div className="input-field col s12">
            <input
              required
              disabled
              value={
                order.phone &&
                order.products
                  .map((product) => product.quantity * product.price)
                  .reduce((acc, item) => acc + item)
              }
              id="number"
              min={1000}
              type="number"
              className="validate"
            />
            <label htmlFor="number">Итоговая сумма вашего заказа</label>
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="btn mr-1 mb-1 green waves-effect">
            Оплатить
          </button>
          <button
            onClick={(e) => cencelOrder(e, id)}
            type="reset"
            className="btn mb-1 red waves-effect"
          >
            Отменить заказ
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ordered;
