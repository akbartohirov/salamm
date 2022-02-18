import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminCategoryPage.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  const [category, setCategory] = React.useState([]);
  const [categoryName, setCategoryName] = React.useState("");
  const [img, setImg] = React.useState({});
  const [createdCategory, setCreatedCategory] = React.useState("");

  React.useEffect(() => {
    axios.get("/category").then((res) => {
      console.log(res.data);
      setCategory(res.data);
    });
  }, [createdCategory]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("categoryName", categoryName);
    fd.append("img", img);

    axios
      .post("/category", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setCreatedCategory(data.categoryName);
        window.M.toast({ html: "Категория создана", classes: "loginToast" });
        setCategoryName("");
        setImg({});
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginToastRed" });
      });
  };

  const deleteHandler = (e, id) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        window.M.toast({
          html: "Категория удалена!",
          classes: "loginToastYellow",
        });
        setCreatedCategory(data.message + Date.now());
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
                <input
                  id="categoryName"
                  type="text"
                  required
                  className="validate"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <label htmlFor="categoryName">Категория</label>
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
          <p className="adminProductPageTitle">Все категории</p>
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
              <th>Категория</th>
              <th>Создан</th>
              <th>Изменить</th>
              <th>Удалить</th>
            </tr>
          </thead>

          <tbody>
            {category.length > 0 &&
              category.map((el, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>
                    <img
                      src={`/${el.img.path}`}
                      height="80px"
                      alt="categoryname"
                    />
                  </th>
                  <th>{el.categoryName}</th>
                  <th>{new Date(el.createdAt).toDateString()}</th>
                  <th>
                    <Link
                      to={`/admin/category/${el._id}`}
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
        {category.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminUsersPage;
