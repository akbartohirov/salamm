import React from "react";
import Loading from "../Loading/Loading";
import "./UserData.css";

const UserData = ({ userData }) => {
  return (
    <div className="row my-data">
      <h3>Мои данные</h3>

      {userData ? (
        <table className="col s12 m6 l12 striped">
          <tbody>
            <tr>
              <td style={{ fontSize: "1.5rem" }}>
                <strong>Имя</strong>
              </td>
              <td style={{ fontSize: "1.5rem" }}>
                <i>{userData && userData.name}</i>
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: "1.5rem" }}>
                <strong>Электрон почта</strong>
              </td>
              <td style={{ fontSize: "1.5rem" }}>
                <i>{userData && userData.email}</i>
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: "1.5rem" }}>
                <strong>Телефон</strong>
              </td>
              <td style={{ fontSize: "1.5rem" }}>
                <i>{userData && userData.phone}</i>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserData;
