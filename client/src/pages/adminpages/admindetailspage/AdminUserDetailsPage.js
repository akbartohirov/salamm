import React from "react";
// import AdminSidebar from "../../../Components/";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminUserDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminUserDetailsPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userOrders, setUserOrders] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setName(data.user.name);
        setEmail(data.user.email);
        setPhone(data.user.phone);
      });
  }, [id]);

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const orders = data.flatMap((item) => {
          const newOrder = item.products.map((el) => {
            return { ...el, date: item.createdAt };
          });
          return newOrder;
        });

        setUserOrders(orders);
      });
  }, [id]);

  const submitHanler = (e) => {
    e.preventDefault();
    console.log();
  };

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminUsersDetailsPage">
        <h4 className="center-align">Данные ползователя</h4>
        <div className="row">
          <form className="col m6 offset-m3" onSubmit={(e) => submitHanler(e)}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  className="validate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Имя</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email адрес</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="phone"
                  type="number"
                  className="validate"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="phone">Тел. номер</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button className="btn" type="submit">
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
        <h4 className="center-align">Закупы ползователя</h4>
        {userOrders.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>товар</th>
                <th>Название товара</th>
                <th>количество</th>
                <th>сумма</th>
                <th>число</th>
              </tr>
            </thead>

            <tbody>
              {userOrders.map((order, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>
                    <img
                      style={{ width: "100px" }}
                      src={`/${order.img[0].path}`}
                      alt={order.title}
                    />
                  </th>
                  <th>{order.title}</th>
                  <th>{order.quantity}</th>
                  <th>{order.quantity * order.price} сум</th>
                  <th>{new Date(order.date).toDateString()}</th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUserDetailsPage;
