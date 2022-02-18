import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminUsersPage.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

const AdminSubSubCategoryPage = () => {
  const [subSubCategories, setSubSubCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = React.useState([]);

  const [subSubCategoryName, setSubSubCategoryName] = React.useState("");
  const [subCategoryName, setSubCategoryName] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");

  const [deleted, setDeleted] = React.useState("");

  const deleteHandler = (e, id) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .delete(`/subsubcategory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setDeleted(res.data.message + Date.now());
        window.M.toast({
          html: "Удалено",
          classes: "loginToastYellow",
        });
      })
      .catch((e) => {
        window.M.toast({
          html: e.message,
          classes: "loginToastRed",
        });
      });
  };

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get("/subcategory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setSubCategories(data);
      });
  }, [deleted]);

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setCategories(data);
      });
  }, [deleted]);

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get("/subsubcategory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setSubSubCategories(data);
      });
  }, [deleted]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .post(
        "/subsubcategory",
        {
          subSubCategoryName,
          subCategory: subCategoryName,
          category: categoryName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDeleted(res.data._id + Date.now());
        window.M.toast({
          html: "Подподкатегория создана",
          classes: "loginToast",
        });
      })
      .catch((e) => {
        window.M.toast({
          html: e.message,
          classes: "loginToastRed",
        });
      });
  };

  const categoryHandler = (e) => {
    setCategoryName(e.target.value);
    const filteredSubCategories = subCategories.filter(
      (el) => el.category === e.target.value
    );
    setFilteredSubCategories(filteredSubCategories);
  };

  return (
    <div className="adminPage">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Cоздать подподкатегорию</h4>
          <form
            onSubmit={(e) => submitHandler(e)}
            style={{ padding: "30px 60px" }}
          >
            <div className="row">
              <div className="input-field col s12">
                <select
                  value={categoryName}
                  onChange={(e) => categoryHandler(e)}
                  className="browser-default"
                >
                  <option defaultValue="Категория">Категория</option>
                  {categories.length > 0 &&
                    categories.map((el) => (
                      <option key={el._id} value={el._categoryName}>
                        {el.categoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <select
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  className="browser-default"
                  disabled={categoryName ? false : true}
                >
                  <option
                    style={{ borderBottom: "1px solid #000" }}
                    defaultValue="Подкатегория"
                  >
                    Подкатегория
                  </option>

                  {filteredSubCategories.length > 0 &&
                    filteredSubCategories.map((el) => (
                      <option key={el._id} value={el._subCategoryName}>
                        {el.subCategoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="categoryName"
                  type="text"
                  required
                  className="validate"
                  value={subSubCategoryName}
                  onChange={(e) => setSubSubCategoryName(e.target.value)}
                />
                <label htmlFor="categoryName">Подподкатегория</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button
                  className="btn waves-effect waves-green green btn-flat close-modal"
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
          <p className="adminProductPageTitle">Все подподкатегории</p>
          <button
            data-target="modal1"
            className="btn modal-trigger right-align"
            onClick={(e) => {
              const elem = document.querySelectorAll(".modal");
              window.M.Modal.init(elem);
            }}
          >
            Создать подподкатегорию
          </button>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Подподкатегория</th>
              <th>Подкатегория</th>
              <th>Категория</th>
              <th>Создан</th>
              <th>Изменить</th>
              <th>Удалить</th>
            </tr>
          </thead>

          <tbody>
            {subSubCategories.length > 0 &&
              subSubCategories.map((el, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>{el.subSubCategoryName}</th>
                  <th>{el.subCategory}</th>
                  <th>{el.category}</th>
                  <th>{new Date(el.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      to={`/admin/subsubcategory/${el._id}`}
                      className="btn yellow accent-4 waves-effect waves-light"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={(e) => deleteHandler(e, el._id)}
                      className="btn deep-orange darken-1 waves-effect waves-light"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {subSubCategories.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminSubSubCategoryPage;
