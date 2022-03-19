import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminUsersPage.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

const AdminBrandsPage = () => {
  const [comapnies, setComapnies] = React.useState([]);
  const [companyLink, setCompanyLink] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [img, setImg] = React.useState([]);

  const [created, setCreated] = React.useState("");

  React.useEffect(() => {
    axios.get("/companies").then((res) => setComapnies(res.data));
  }, [created]);

  const submitHanler = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("companyName", companyName);
    fd.append("companyLink", companyLink);
    fd.append("img", img);

    axios
      .post("/companies", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreated(res.data.brandName + Date.now());
        window.M.toast({ html: "Сотрудник создан", classes: "loginToast" });
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginTostRed" });
      });
  };

  const deleteHandler = (e, id) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .delete(`/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreated(res.data.message + Date.now());
        window.M.toast({
          html: "Сотрудник удален",
          classes: "loginToastYellow",
        });
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginToastRed" });
      });
  };

  return (
    <div className="adminPage">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Cоздать Сотрудников</h4>
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
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <label htmlFor="name">Название компании</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  required
                  className="validate"
                  value={companyLink}
                  onChange={(e) => setCompanyLink(e.target.value)}
                />
                <label htmlFor="name">Путь</label>
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
          <p className="adminProductPageTitle">Все Компании</p>
          <button
            data-target="modal1"
            className="btn modal-trigger right-align"
            onClick={(e) => {
              const elem = document.querySelectorAll(".modal");
              window.M.Modal.init(elem);
            }}
          >
            Создать Сотрудников
          </button>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Изображение</th>
              <th>Компания</th>
              <th>Путь</th>
              <th>Создан</th>
              <th>Изменить</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {comapnies.length > 0 &&
              comapnies.map((company, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>
                    <img
                      height="80px"
                      src={`/${company.img.path}`}
                      alt={company.img.filename}
                    />
                  </th>
                  <th>{company.companyName}</th>
                  <th>{company.companyLink}</th>
                  <th>{new Date(company.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      to={`/admin/company/${company._id}`}
                      className="btn yellow accent-4 waves-effect waves-light"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </th>

                  <th>
                    <button
                      onClick={(e) => deleteHandler(e, company._id)}
                      className="btn deep-orange darken-1 waves-effect waves-light"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {comapnies.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminBrandsPage;
