import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminUsersPage.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState("");
  const [deleted, setDeleted] = React.useState("");

  const deleteHandler = async (e, id) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    try {
      if (window.confirm("Вы увепены?")) {
        const { data } = await axios.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        window.M.toast({
          html: "Ползователь удален",
          classes: "loginToast",
        });
        setDeleted(data.msg);
      }
    } catch (e) {
      window.M.toast({ html: e.message, classes: "loginToastRed" });
      return;
    }
  };

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((e) => {
        setError(e.message);
      });
    setDeleted("");
  }, [deleted]);

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminUsersPage">
        <p className="adminUserPageTitle">Все пользователи</p>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Електронная почта</th>
              <th>Телефон ноиер</th>
              <th>Главный админ</th>
              <th>Админ 1</th>
              <th>Админ 2</th>
              <th>Создан</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 &&
              users.map((user, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>{user.phone}</th>
                  <th>
                    {user.isAdmin ? (
                      <i className="fas fa-check success light-green-text accent-3-text"></i>
                    ) : (
                      <i className="fas fa-times deep-orange-text darken-1-text"></i>
                    )}
                  </th>

                  <th>
                    {user.isAdminAddProduct ? (
                      <i className="fas fa-check success light-green-text accent-3-text"></i>
                    ) : (
                      <i className="fas fa-times deep-orange-text darken-1-text"></i>
                    )}
                  </th>

                  <th>
                    {user.isAdminOrderViewer ? (
                      <i className="fas fa-check success light-green-text accent-3-text"></i>
                    ) : (
                      <i className="fas fa-times deep-orange-text darken-1-text"></i>
                    )}
                  </th>
                  <th>{new Date(user.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      to={`/admin/users/${user._id}`}
                      className="btn yellow accent-4 waves-effect waves-light"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={(e) => deleteHandler(e, user._id)}
                      className="btn deep-orange darken-1 waves-effect waves-light"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {users.length === 0 && !error ? (
          <Loading />
        ) : (
          <span className="red-text">{error}</span>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
