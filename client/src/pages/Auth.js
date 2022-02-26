import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Auth = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const auth = useContext(AuthContext);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", form, {
        headers: {
          "Conent-Type": "application/json",
        },
      });

      console.log(data.user.isAdmin);

      window.M.toast({ html: "Вы успешно вошли", classes: "loginToast" });
      auth.login(
        data.token,
        data.user._id,
        data.user.isAdmin,
        data.user.isAdminAddProduct,
        data.user.isAdminOrderViewer
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
        onSubmit={(e) => onLogin(e)}
      >
        <div className="row col">
          <h3>Войти</h3>
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
              className="waves-effect waves-light btn-large mb-3"
            >
              Войти
            </button>
            <span className="col s12">
              Если не зарегистрирован.{" "}
              <Link to="/register" className="underline">
                Регистрация
              </Link>{" "}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
