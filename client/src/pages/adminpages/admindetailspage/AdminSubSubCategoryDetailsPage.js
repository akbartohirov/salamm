import React from "react";
// import AdminSidebar from "../../../Components/";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminSubCategoryDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminSubUserDetailsPage = () => {
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);

  const [form, setForm] = React.useState({
    subSubCategoryName: "",
    subCategory: "",
    category: "",
  });

  const { id } = useParams();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/subsubcategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setForm({
          subSubCategoryName: data.subSubCategoryName,
          subCategory: data.subCategory,
          category: data.category,
        });
      });
  }, [id]);

  React.useEffect(() => {
    axios.get(`/category`).then(({ data }) => {
      setCategories(data);
    });
  }, [id]);

  React.useEffect(() => {
    axios.get(`/subcategory`).then(({ data }) => {
      setSubCategories(data);
    });
  }, [id]);

  const submitHanler = (e) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    e.preventDefault();

    axios
      .patch(`/subsubcategory/${id}`, form, {
        headers: {
          "Content-Type": "application/json",
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

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminUsersDetailsPage">
        <h4 className="center-align">Подподкатегория</h4>
        <div className="row">
          <form className="col m6 offset-m3" onSubmit={(e) => submitHanler(e)}>
            <div className="row">
              <div className="input-field col s12">
                <select
                  value={form.category}
                  onChange={(e) => onChange(e)}
                  name="category"
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
                <select
                  value={form.subCategory}
                  onChange={(e) => onChange(e)}
                  name="subCategory"
                  className="browser-default"
                >
                  <option value="" disabled>
                    Подкатегория
                  </option>
                  {subCategories.length > 0 &&
                    subCategories.map((el) => (
                      <option key={el._id} value={el.subCategoryName}>
                        {el.subCategoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="subSubCategoryName"
                  type="text"
                  name="subSubCategoryName"
                  required
                  className="validate"
                  value={form.subSubCategoryName}
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="subSubCategoryName">Подподкатегория</label>
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
