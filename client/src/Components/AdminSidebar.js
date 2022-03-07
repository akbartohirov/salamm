import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const data = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="adminSidebar">
      <ul className="sidebarList">
        {data.user && (
          <>
            <Link to="/admin/category">
              <li className="sidebarListItem">
                <i className="fas fa-list sidebarIcon"></i>
                <span className="sidebarListItemTitle">Категории</span>
              </li>
            </Link>

            <Link to="/admin/subcategory">
              <li className="sidebarListItem">
                <i className="fas fa-list sidebarIcon"></i>
                <span className="sidebarListItemTitle">Подкатегории</span>
              </li>
            </Link>

            <Link to="/admin/subsubcategory">
              <li className="sidebarListItem">
                <i className="fas fa-list sidebarIcon"></i>
                <span className="sidebarListItemTitle">Подподкатегории</span>
              </li>
            </Link>

            <Link to="/admin/products">
              <li className="sidebarListItem">
                <i className="fas fa-shopping-cart sidebarIcon"></i>
                <span className="sidebarListItemTitle">Товары</span>
              </li>
            </Link>

            <Link to="/admin/users">
              <li className="sidebarListItem">
                <i className="fas fa-user sidebarIcon"></i>
                <span className="sidebarListItemTitle">Пользователи</span>
              </li>
            </Link>

            <Link to="/admin/orders">
              <li className="sidebarListItem">
                <i className="fas fa-clipboard-list sidebarIcon"></i>
                <span className="sidebarListItemTitle">Заказы</span>
              </li>
            </Link>

            <Link to="/admin/brands">
              <li className="sidebarListItem">
                <i className="fas fa-copyright sidebarIcon"></i>
                <span className="sidebarListItemTitle">Бренды</span>
              </li>
            </Link>

            <Link to="/admin/companies">
              <li className="sidebarListItem">
                <i className="fas fa-building sidebarIcon"></i>
                <span className="sidebarListItemTitle">Компании</span>
              </li>
            </Link>

            <Link to="/admin/banner">
              <li className="sidebarListItem">
                <i className="fas fa-image sidebarIcon"></i>
                <span className="sidebarListItemTitle">Баннер</span>
              </li>
            </Link>

            <Link to="/admin/carousels">
              <li className="sidebarListItem">
                <i className="fas fa-image sidebarIcon"></i>
                <span className="sidebarListItemTitle">Слайды</span>
              </li>
            </Link>
          </>
        )}
        {data.addProduct && (
          <Link to="/admin/onlyaddproduct">
            <li className="sidebarListItem">
              <i className="fas fa-shopping-cart sidebarIcon"></i>
              <span className="sidebarListItemTitle">Товары</span>
            </li>
          </Link>
        )}
        {data.orderViewer && (
          <Link to="/admin/onlyorderview">
            <li className="sidebarListItem">
              <i className="fas fa-clipboard-list sidebarIcon"></i>
              <span className="sidebarListItemTitle">Заказы</span>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default AdminSidebar;
