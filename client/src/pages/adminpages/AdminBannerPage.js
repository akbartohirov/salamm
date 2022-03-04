import React from "react";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminUsersPage.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

const AdminBrandsPage = () => {
  const [banner, setBanner] = React.useState([]);
  const [changed, setChanged] = React.useState("");
  const [img, setImg] = React.useState([]);

  React.useEffect(() => {
    axios.get("/banner").then((res) => setBanner(res.data));
  }, [changed]);

  const submitHanler = (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem("userData"));

    const fd = new FormData();

    fd.append("img", img);

    axios
      .patch(`/banner/${banner.length && banner[0]._id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setChanged(res.data.brandName + Date.now());
        window.M.toast({ html: "Изменение созранено", classes: "loginToast" });
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
        <table className="striped">
          <thead>
            <tr>
              <th>Изображение</th>
              <th>Изменить</th>
            </tr>
          </thead>
          <tbody>
            {banner.length > 0 &&
              banner.map((brand, index) => (
                <tr key={index + 1}>
                  <th>
                    <img
                      height="200px"
                      src={`/${brand.img.path}`}
                      alt={brand.img.filename}
                    />
                  </th>
                  <th>
                    <button
                      data-target="modal1"
                      className="btn modal-trigger yellow accent-4 waves-effect waves-light"
                      onClick={(e) => {
                        const elem = document.querySelectorAll(".modal");
                        window.M.Modal.init(elem);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {banner.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminBrandsPage;
