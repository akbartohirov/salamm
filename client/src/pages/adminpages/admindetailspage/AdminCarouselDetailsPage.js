import React from "react";
// import AdminSidebar from "../../../Components/";
import AdminSidebar from "../../../Components/AdminSidebar";
import "./AdminProductDetailsPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminProductDetailsPage = () => {
  const [link, setLink] = React.useState("");
  const [slide, setSlide] = React.useState("");
  const [img, setImg] = React.useState([]);
  const [subSubCategoies, setSubSubCategories] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get(`/carousel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setLink(data.link);
        setSlide(data.slidenum);
        setImg(data.path);
      });
  }, [id]);

  React.useEffect(() => {
    axios.get("/subsubcategory").then((res) => {
      setSubSubCategories(res.data);
    });
  }, []);

  const submitHanler = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("link", link);
    fd.append("slidenum", slide);
    fd.append("img", img);

    axios
      .patch(`/carousel/${id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.M.toast({ html: "Слайд изменён", classes: "loginToast" });
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
          <form
            className="col m6 offset-m3"
            style={{ padding: "0 2rem" }}
            onSubmit={(e) => submitHanler(e)}
          >
            <div className="row">
              <div className="file-field input-field col s12">
                <div className="btn">
                  <span>Изображения</span>
                  <input
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>

              <div className="file-field input-field col s12">
                <select
                  onChange={(e) => setSlide(e.target.value)}
                  value={slide}
                  className="browser-default"
                >
                  <option defaultValue="" disabled>
                    Номер слайда
                  </option>
                  <option value="1">Слайд 1</option>
                  <option value="2">Слайд 2</option>
                </select>
              </div>

              <div className="file-field input-field col s12">
                <select
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  className="browser-default"
                >
                  <option defaultValue="" disabled>
                    Куда
                  </option>
                  <option value="">Не куда</option>
                  {subSubCategoies.length &&
                    subSubCategoies.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.subSubCategoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button
                  className="btn waves-effect waves-green green btn-flat"
                  type="submit"
                >
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
