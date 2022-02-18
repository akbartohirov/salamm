import React from "react";
// import AdminSidebar from "../../../Components/";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminSubCategoryDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminSubUserDetailsPage = () => {
  const [categories, setCategories] = React.useState([]);
  const [subCategoryName, setSubCategoryName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [img, setImg] = React.useState("");
  const { id } = useParams();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/subcategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setSubCategoryName(data.subCategoryName);
        setCategory(data.category);
        setImg(data.img);
      });
  }, [id]);

  React.useEffect(() => {
    axios.get(`/category`, {}).then(({ data }) => {
      setCategories(data);
    });
  }, [id]);

  const submitHanler = (e) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    e.preventDefault();

    const fd = new FormData();
    fd.append("subCategoryName", subCategoryName);
    fd.append("img", img);

    axios
      .patch(`/subcategory/${id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.M.toast({ html: "Имзменения сохранени", classes: "loginToast" });
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginToastRed" });
      });
  };

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminUsersDetailsPage">
        <h4 className="center-align">Подкатегория</h4>
        <div className="row">
          <form className="col m6 offset-m3" onSubmit={(e) => submitHanler(e)}>
            <div className="row">
              <div className="input-field col s12">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="browser-default"
                >
                  <option value="" disabled>
                    Категория
                  </option>
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
                <input
                  id="categoryName"
                  type="text"
                  required
                  className="validate"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
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
                <button className="btn" type="submit">
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSubUserDetailsPage;
