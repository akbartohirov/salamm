import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminOrdersPage.css";

const AdminOrdersPage = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get("/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data);

        setOrders(res.data);
      });
  }, []);

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminOrdersPage">
        <div className="adminOrdersPageHeader">
          <p className="adminOrdersPageTitle">Все принятые заказы</p>
          <button
            data-target="modal1"
            className="btn modal-trigger right-align"
            onClick={(e) => {
              const elem = document.querySelectorAll(".modal");
              window.M.Modal.init(elem);
            }}
          >
            Создать продукт
          </button>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>ID заказчика</th>
              <th>Телю номер</th>
              <th>Тип отправки</th>
              <th>Дата заказа</th>
              <th></th>
              <th>Статус</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 &&
              orders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <th>
                    <Link
                      className="black-text"
                      to={`/admin/users/${order.userId}`}
                    >
                      {order.userId}
                    </Link>
                  </th>
                  <th>{order.phone}</th>
                  <th>{order.typeSending}</th>
                  <th>{new Date(order.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      style={{
                        padding: "10px",
                        border: "1px solid",
                        borderRadius: "5px",
                      }}
                      className={"hover-effect"}
                      to={`/admin/orders/${order._id}`}
                    >
                      Обзор
                    </Link>
                  </th>
                  <th>
                    {order.status === "новый" && (
                      <span
                        style={{
                          color: "#fff",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                        className="blue lighten-1"
                      >
                        {order.status}
                      </span>
                    )}

                    {order.status === "отправлен" && (
                      <span
                        style={{
                          color: "#fff",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                        className="yellow lighten-1"
                      >
                        {order.status}
                      </span>
                    )}

                    {order.status === "доставлен" && (
                      <span
                        style={{
                          color: "#fff",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                        className="green lighten-1"
                      >
                        {order.status}
                      </span>
                    )}

                    {order.status === "Отменён" && (
                      <span
                        style={{
                          color: "#fff",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                        className="red lighten-1"
                      >
                        {order.status}
                      </span>
                    )}
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {/* {products.length === 0 && <Loading />} */}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
