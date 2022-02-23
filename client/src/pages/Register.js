import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const auth = useContext(AuthContext);

  const history = useHistory();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onRegister = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const user = await axios.post("/auth/register", form, {
        headers: {
          "Conent-Type": "application/json",
        },
      });
      window.M.toast({ html: "Ползователь создан", classes: "loginToast" });
      auth.login(
        user.data.token,
        user.data.user._id,
        user.data.user.isAdminAddProduct,
        user.data.user.isAdminOrderViewer
      );
      history.push("/");
    } catch (e) {
      window.M.toast({ html: "Что то пошло не так", classes: "loginToastRed" });
    }
  };

  return (
    <div className="row mt-2">
      <form
        className="col s12 l4 m4"
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onSubmit={(e) => onRegister(e)}
      >
        <div className="row col">
          <h3>Регистрация</h3>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(e) => onChangeHandler(e)}
              id="name"
              type="text"
              name="name"
              value={form.name}
              className="validate"
            />
            <label htmlFor="name">Иия</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(e) => onChangeHandler(e)}
              id="email"
              type="email"
              name="email"
              value={form.email}
              className="validate"
            />
            <label htmlFor="email">Электронная почта</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(e) => onChangeHandler(e)}
              id="phone"
              type="number"
              name="phone"
              value={form.phone}
              className="validate"
            />
            <label htmlFor="phone">Телефон ноиер</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(e) => onChangeHandler(e)}
              id="password"
              type="password"
              name="password"
              className="validate"
              value={form.password}
            />
            <label htmlFor="password">Пароль</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <button
              type="submit"
              className="waves-effect waves-light btn-large"
            >
              Регистрация
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
