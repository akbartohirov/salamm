import React from "react";
// import AdminSidebar from "../../../Components/";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminCategoryDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminUserDetailsPage = () => {
  const [name, setName] = React.useState("");
  const [img, setImg] = React.useState("");
  const { id } = useParams();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setName(data.categoryName);
        setImg(data.img);
      });
  }, [id]);

  const submitHanler = (e) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    e.preventDefault();

    const fd = new FormData();
    fd.append("categoryName", name);
    fd.append("img", img);

    axios
      .patch(`/category/${id}`, fd, {
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
        <h4 className="center-align">Категория</h4>
        <div className="row">
          <form className="col m6 offset-m3" onSubmit={(e) => submitHanler(e)}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  className="validate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Категория</label>
              </div>
            </div>
            <div className="row">
              <div className="file-field input-field col s12">
                <div className="btn">
                  <span>Изображения</span>
                  <input
                    type="file"
                    required
                    multiple
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

export default AdminUserDetailsPage;
