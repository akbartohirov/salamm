import React from "react";
// import AdminSidebar from "../../../Components/";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminProductDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminProductDetailsPage = () => {
  const [name, setName] = React.useState("");
  const [img, setImg] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/brand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setName(data.brandName);
        setImg(data.img);
      });
  }, [id]);

  const submitHanler = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("brandName", name);
    fd.append("img", img);

    axios
      .patch(`/brand/${id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.M.toast({ html: "Бренд изменён", classes: "loginToast" });
      })
      .catch((e) => {
        window.M.toast({
          html: "Бренд не изменён",
          classes: "loginToastRed",
        });
      });
  };

  return (
    <div className="adminPage">
      <AdminSidebar />
      <div className="adminUsersDetailsPage">
        <h4 className="center-align">Данные продукта</h4>
        <div className="row">
          <form className="col m6 offset-m3" onSubmit={(e) => submitHanler(e)}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  type="text"
                  className="validate"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="title">Название товара</label>
              </div>
            </div>

            <div className="row">
              <div className="file-field input-field col s12">
                <div className="btn">
                  <span>Изображения</span>
                  <input
                    type="file"
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

export default AdminProductDetailsPage;
