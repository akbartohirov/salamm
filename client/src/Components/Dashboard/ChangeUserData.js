import React, { useState, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";

const ChangeUserData = ({ userData }) => {
  const auth = useContext(AuthContext);

  const [userFormData, setUserFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });

  const onChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/users/${auth.userId}`, userFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });
      window.M.toast({ html: "Успешно сохранен", classes: "loginToast" });
    } catch (e) {
      window.M.toast({ html: "Что то пошло не так", classes: "loginToastRed" });
    }
    window.location.reload();
  };

  window.M.updateTextFields();

  return (
    <div>
      <h3>Изменить Данные</h3>

      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={(e) => onChange(e)}
                id="name"
                type="text"
                name="name"
                className="validate"
                value={userFormData.name}
              />
              <label htmlFor="name">Имя</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={(e) => onChange(e)}
                id="email"
                type="email"
                name="email"
                className="validate"
                value={userFormData.email}
              />
              <label htmlFor="email">Электрон почта</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={(e) => onChange(e)}
                name="phone"
                id="tel"
                type="tel"
                className="validate"
                value={userFormData.phone}
              />
              <label htmlFor="tel">Телефон номер</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <a
                href="/dashboard"
                onClick={(e) => onSubmit(e)}
                type="submit"
                className="waves-effect waves-light btn-large"
              >
                Сохранить
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserData;
