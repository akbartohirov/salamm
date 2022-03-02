import React from "react";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminOrderDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminOrderDetailsPage = () => {
  const [order, setOrder] = React.useState({});
  const [status, setStatus] = React.useState("");

  const { id } = useParams();

  React.useEffect(() => {
    const token =
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")).token;

    axios
      .get(`/orders/exact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrder(res.data);
        setStatus(res.data.status);
      });
  }, [id, status]);

  const statusHandler = (e) => {
    const token =
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")).token;

    axios.patch(
      `/orders/${id}`,
      { status: e.target.value },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setStatus(e.target.value);
  };

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminUsersDetailsPage">
        <div className="row">
          <div className="col s12 m8">
            <h4>{`Заказ с ID ${order._id}`}</h4>
            <span style={{ fontWeight: "600" }}> Данные заказчика</span>
            <hr />
            <h6>
              ID:{" "}
              <Link to={`/admin/users/${order.userId}`}>{order.userId}</Link>{" "}
            </h6>
            <h6>Тел: {order.phone}</h6>
            <br />
            <span style={{ fontWeight: "600" }}> Адрес</span>
            <hr />
            <h6>Город: {order.city}</h6>
            <h6>Улица: {order.street}</h6>
            <br />

            {order.entityName && order.stir && (
              <>
                <span style={{ fontWeight: "600" }}> Данные заказчика</span>
                <hr />

                <h6>Название организации: {order.entityName}</h6>
                <h6>ИНН: {order.stir}</h6>
              </>
            )}
            <br />
            <span style={{ fontWeight: "600" }}> Статус</span>
            <hr />
            <label>Browser Select</label>
            <select
              value={status}
              onChange={(e) => statusHandler(e)}
              className={`browser-default lighten-1 ${
                status === "новый" && "blue"
              } ${status === "отправлен" && "yellow"} ${
                status === "доставлен" && "green"
              } ${status === "Отменён" && "red"}`}
            >
              <option value="" disabled>
                Выбрать
              </option>
              <option
                style={{ margin: "10px" }}
                className="lighten-1 blue"
                value="новый"
              >
                новый
              </option>
              <option
                style={{ margin: "10px" }}
                className="lighten-1 yellow"
                value="отправлен"
              >
                отправлен
              </option>
              <option
                style={{ margin: "10px" }}
                className="lighten-1 green"
                value="доставлен"
              >
                доставлен
              </option>
              <option
                style={{ margin: "10px" }}
                className="lighten-1 red"
                value="Отменён"
              >
                Отменён
              </option>
            </select>
          </div>
          <div className="col s12 m4">xayr</div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;
