import React from "react";
import { Link } from "react-router-dom";
import "./SearchProductItem.css";

const SearchProductItem = ({ data }) => {
  return (
    <div className="searchedProduct">
      <div className="searchedProductImage">
        <img src={`/${data.img[0].path}`} alt="product img" />
      </div>
      <div className="searchedProductTitle">
        <Link to={`/product/${data._id}`} className="searchedProductTitleLink">
          {data.title}
        </Link>
      </div>
    </div>
  );
};

export default SearchProductItem;
