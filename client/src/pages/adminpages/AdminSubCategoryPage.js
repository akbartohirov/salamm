import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminSubCategoryPage.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

const AdminSubCategoryPage = () => {
  const [subcategory, setSubcategory] = React.useState([]);
  const [category, setCategory] = React.useState([]);

  const [created, setCreated] = React.useState("");

  const [formCategory, setFormCategory] = React.useState("");
  const [formSubCategory, setFormSubCategory] = React.useState("");
  const [img, setImg] = React.useState("");

  React.useEffect(() => {
    axios.get("/subcategory").then((res) => {
      setSubcategory(res.data);
      console.log(res.data);
    });
  }, [created]);

  React.useEffect(() => {
    axios.get("/category").then((res) => {
      setCategory(res.data);
      console.log(res.data);
    });
  }, [created]);

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    fd.append("subCategoryName", formSubCategory);
    fd.append("category", formCategory);
    fd.append("img", img);

    axios
      .post("/subcategory", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreated(res.data.subCategoryName + Date.now());
        console.log(res.data._id);
        window.M.toast({ html: "Подкатегория создана", classes: "loginToast" });
      })
      .catch((e) => {
        window.M.toast({
          html: "Подкатегория создана",
          classes: "loginToastRed",
        });
      });
  };

  const deleteHandler = (e, id) => {
    console.log(id);
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .delete(`/subcategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreated(res.data.message + Date.now());
        window.M.toast({
          html: "Подкатегория удалена",
          classes: "loginToastYellow",
        });
      });
  };

  return (
    <div className="adminPage">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Cоздать категорию</h4>
          <form
            onSubmit={(e) => submitHandler(e)}
            style={{ padding: "30px 60px" }}
          >
            <div className="row">
              <div className="input-field col s12">
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="browser-default"
                >
                  <option value="" disabled>
                    Категория
                  </option>
                  {category.length > 0 &&
                    category.map((el) => (
                      <option key={el._id} value={el._categoryName}>
                        {el.categoryName}
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
                  value={formSubCategory}
                  onChange={(e) => setFormSubCategory(e.target.value)}
                />
                <label htmlFor="categoryName">Подкатегория</label>
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
          <p className="adminProductPageTitle">Все подкатегории</p>
          <button
            data-target="modal1"
            className="btn modal-trigger right-align"
            onClick={(e) => {
              const elem = document.querySelectorAll(".modal");
              window.M.Modal.init(elem);
            }}
          >
            Создать категорию
          </button>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Картина</th>
              <th>Подкатегория</th>
              <th>Категория</th>
              <th>Создан</th>
              <th>Изменить</th>
              <th>Удалить</th>
            </tr>
          </thead>

          <tbody>
            {subcategory.length > 0 &&
              subcategory.map((el, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>
                    <img
                      src={`/${el.img.path}`}
                      height="80px"
                      alt="categoryname"
                    />
                  </th>
                  <th>{el.subCategoryName}</th>
                  <th>{el.category}</th>
                  <th>{new Date(el.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      to={`/admin/subcategory/${el._id}`}
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
        {subcategory.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminSubCategoryPage;
