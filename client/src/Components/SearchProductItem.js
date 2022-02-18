import React from "react";
import { Link } from "react-router-dom";
import "./SearchProductItem.css";

const SearchProductItem = ({ data }) => {
  return (
    <div className="searchedProduct">
      <div className="searchedProductImage">
        <img
          src="https://res.cloudinary.com/lmru/image/upload/f_auto,q_auto,w_400,h_400,c_pad,b_white,d_photoiscoming.png/LMCode/93896071_04.jpg"
          alt="product img"
        />
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
