import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ChangeUserData from "../Components/Dashboard/ChangeUserData";
import HistoryOrders from "../Components/Dashboard/HistoryOrders";
import UserData from "../Components/Dashboard/UserData";
import axios from "axios";

const Dashboard = () => {
  const [userDashboard, setUserDashboard] = useState("UserData");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userData")).userId;
    const token = JSON.parse(localStorage.getItem("userData")).token;
    axios
      .get(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
      });
  }, []);

  const sideBar = (e) => {
    setUserDashboard(e.target.id);

    const getItems = document.querySelectorAll(".collection-item");

    getItems.forEach((item) => {
      item.classList.remove("active");
    });

    e.target.classList.add("active");
  };

  const dashFunc = (e) => {
    switch (userDashboard) {
      case "ChangeUserData":
        return <ChangeUserData userData={userData} />;

      case "HistoryOrders":
        return <HistoryOrders />;

      case "UserData":
        return <UserData userData={userData} />;

      default:
        <UserData />;
        break;
    }
  };

  return (
    <main className="container mt-3 row main">
      <div className="side-nav col s12 m6 l3">
        <div className="collection">
          <a
            onClick={(e) => sideBar(e)}
            id="UserData"
            className="collection-item active "
            style={{ cursor: "pointer" }}
          >
            Личные данные
          </a>
          <a
            onClick={(e) => sideBar(e)}
            id="HistoryOrders"
            className="collection-item "
            style={{ cursor: "pointer" }}
          >
            История покупок
          </a>
          <a
            onClick={(e) => sideBar(e)}
            id="ChangeUserData"
            className="collection-item "
            style={{ cursor: "pointer" }}
          >
            Изменить данные
          </a>
        </div>
      </div>
      <div className="main-page col s12 m6 l9">{dashFunc()}</div>
    </main>
  );
};

export default Dashboard;
