import React from "react";
import "./CatalogItem.css";
import { Link } from "react-router-dom";

const CatalogItem = ({ item, subs }) => {
  return (
    <div className="catalog__item">
      <div className="catalog__item-img">
        <img src={`/${item.img.path}`} alt="img" />
      </div>
      <div className="catalog__item-content">
        <Link to={`/category/${item._id}`}>
          <span
            className="link__hover"
            style={{ fontSize: "20px", fontWeight: 600, color: "#000" }}
          >
            {item.categoryName}
          </span>
        </Link>
        {subs.length > 0 &&
          subs.slice(0, 3).map((el) => (
            <Link
              key={el._id}
              to={`/category/${item._id}?subcategories=${el._id}`}
              className="mb-1"
            >
              <span className="link__hover" style={{ color: "#000" }}>
                {" "}
                {el.subCategoryName}{" "}
              </span>
            </Link>
          ))}
        {subs.length > 3 && <span> Еще {subs.length - 3}</span>}
      </div>
    </div>
  );
};

export default CatalogItem;
