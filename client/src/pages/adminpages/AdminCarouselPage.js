import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminUsersPage.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminBrandsPage = () => {
  const [carousel, setCarousel] = React.useState([]);
  const [subSubCategories, setSubSubcategories] = React.useState([]);
  const [changed, setChanged] = React.useState("");
  const [slide, setSlide] = React.useState("");
  const [link, setLink] = React.useState("");
  const [img, setImg] = React.useState([]);

  React.useEffect(() => {
    axios.get("/carousel").then((res) => {
      setCarousel(res.data);
    });
  }, [changed]);

  React.useEffect(() => {
    axios.get("/subsubcategory").then((res) => {
      setSubSubcategories(res.data);
    });
  }, []);

  const submitHanler = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("img", img);
    fd.append("slidenum", slide);
    fd.append("link", link);

    axios
      .post(`/carousel`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setChanged(res.data.brandName + Date.now());
        window.M.toast({ html: "Слайд создан", classes: "loginToast" });
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginTostRed" });
      });
  };

  const deleteHandler = (e, id) => {
    axios
      .delete(`/carousel/${id}`)
      .then((res) => {
        console.log(res);
        setChanged(res);
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginTostRed" });
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

              <div className="file-field input-field col s12">
                <select
                  onChange={(e) => setSlide(e.target.value)}
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
                  className="browser-default"
                >
                  <option defaultValue="" disabled>
                    Куда
                  </option>
                  <option value="">Не куда</option>
                  {subSubCategories.length &&
                    subSubCategories.map((item, index) => (
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
            Создать Слайд
          </button>
        </div>
        <table className="striped">
          <thead>
            <tr>
              <th>Изображение</th>
              <th>Куда</th>
              <th>Номер слайда</th>
              <th>Изменить</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {carousel.length > 0 &&
              carousel.map((car, index) => (
                <tr key={index + 1}>
                  <th>
                    <img height="100px" src={`/${car.path}`} alt={car.path} />
                  </th>
                  <th>{car.link}</th>
                  <th>{car.slidenum}</th>
                  <th>
                    <Link
                      to={`/admin/carousel/${car._id}`}
                      className="btn modal-trigger yellow accent-4 waves-effect waves-light"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={(e) => deleteHandler(e, car._id)}
                      className="btn red waves-effect waves-light"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {carousel.length === 0 && <h5>Пока слайдов нет</h5>}
      </div>
    </div>
  );
};

export default AdminBrandsPage;
