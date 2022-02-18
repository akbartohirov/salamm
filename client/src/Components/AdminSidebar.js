import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  // const allLinks = document.querySelectorAll(".sidebarListItem");

  // allLinks.forEach((link) => {
  //   link.classList.remove("admin-active");
  //   link.addEventListener("click", (e) => {
  //     e.target.classList.add("admin-active");
  //   });
  // });

  return (
    <div className="adminSidebar">
      <ul className="sidebarList">
        <Link to="/admin/category">
          <li className="sidebarListItem">
            <i className="fas fa-list sidebarIcon"></i>
            <span className="sidebarListItemTitle">Categories</span>
          </li>
        </Link>

        <Link to="/admin/subcategory">
          <li className="sidebarListItem">
            <i className="fas fa-list sidebarIcon"></i>
            <span className="sidebarListItemTitle">Subcategories</span>
          </li>
        </Link>

        <Link to="/admin/subsubcategory">
          <li className="sidebarListItem">
            <i className="fas fa-list sidebarIcon"></i>
            <span className="sidebarListItemTitle">Subsubcategories</span>
          </li>
        </Link>

        <Link to="/admin/products">
          <li className="sidebarListItem">
            <i className="fas fa-shopping-cart sidebarIcon"></i>
            <span className="sidebarListItemTitle">Products</span>
          </li>
        </Link>

        <Link to="/admin/users">
          <li className="sidebarListItem">
            <i className="fas fa-user sidebarIcon"></i>
            <span className="sidebarListItemTitle">Users</span>
          </li>
        </Link>

        <Link to="/admin/orders">
          <li className="sidebarListItem">
            <i className="fas fa-clipboard-list sidebarIcon"></i>
            <span className="sidebarListItemTitle">Orders</span>
          </li>
        </Link>

        <Link to="/admin/brands">
          <li className="sidebarListItem">
            <i className="fas fa-copyright sidebarIcon"></i>
            <span className="sidebarListItemTitle">Brands</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;
