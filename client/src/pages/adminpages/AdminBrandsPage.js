import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminUsersPage.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

const AdminBrandsPage = () => {
  const [brands, setBrands] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [img, setImg] = React.useState([]);

  const [created, setCreated] = React.useState("");

  React.useEffect(() => {
    axios.get("/brand").then((res) => setBrands(res.data));
  }, [created]);

  const submitHanler = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("brandName", name);
    fd.append("img", img);

    axios
      .post("/brand", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreated(res.data.brandName + Date.now());
        window.M.toast({ html: "Бренд создан", classes: "loginToast" });
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginTostRed" });
      });
  };

  const deleteHandler = (e, id) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .delete(`/brand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreated(res.data.message + Date.now());
        window.M.toast({ html: "Бренд удален", classes: "loginToastYellow" });
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginToastRed" });
      });
  };

  return (
    <div className="adminPage">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Cоздать Бренд</h4>
          <form
            className="col m6 offset-m3"
            style={{ padding: "0 2rem" }}
            onSubmit={(e) => submitHanler(e)}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  required
                  className="validate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Название товара</label>
              </div>
            </div>

            <div className="row">
              <div className="file-field input-field col s12">
                <div className="btn">
                  <span>Изображения</span>
                  <input
                    type="file"
                    required
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button
                  className="btn waves-effect waves-green green btn-flat"
                  type="submit"
                >
                  Создать
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
      <AdminSidebar />
      <div className="adminUsersPage">
        <div className="adminProductsPageHeader">
          <p className="adminProductPageTitle">Все бренди</p>
          <button
            data-target="modal1"
            className="btn modal-trigger right-align"
            onClick={(e) => {
              const elem = document.querySelectorAll(".modal");
              window.M.Modal.init(elem);
            }}
          >
            Создать Бренд
          </button>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Изображение</th>
              <th>Бранд</th>
              <th>Создан</th>
              <th>Изменить</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 &&
              brands.map((brand, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>
                    <img
                      height="80px"
                      src={`/${brand.img.path}`}
                      alt={brand.img.filename}
                    />
                  </th>
                  <th>{brand.brandName}</th>
                  <th>{new Date(brand.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      to={`/admin/brands/${brand._id}`}
                      className="btn yellow accent-4 waves-effect waves-light"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </th>

                  <th>
                    <button
                      onClick={(e) => deleteHandler(e, brand._id)}
                      className="btn deep-orange darken-1 waves-effect waves-light"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {brands.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminBrandsPage;
