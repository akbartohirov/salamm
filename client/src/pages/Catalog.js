import React, { useEffect, useState } from "react";
import axios from "axios";
import CatalogItem from "../Components/CatalogItem";
import "./Catalog.css";
import Loading from "../Components/Loading/Loading";

//Канцтовары , хозтовары , мебель , парфюмерия , бытовые техники , компьютеры, телефоны , мода, автоаксессуары , спорттовары

const Catalog = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    axios.get("/category").then((res) => {
      setCategory(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/subcategory").then((res) => {
      setSubCategory(res.data);
    });
  }, []);

  return (
    <div className="container mb-3">
      <h4 style={{ fontWeight: "500", marginBottom: "2rem" }}>Каталог</h4>
      <div className="catalog">
        {category.length === 0 ? (
          <Loading />
        ) : (
          category.map((item, index) => {
            const filteredSub =
              subCategory.length > 0 &&
              subCategory.filter((el) => el.category === item.categoryName);

            return <CatalogItem key={index} item={item} subs={filteredSub} />;
          })
        )}
      </div>
    </div>
  );
};

export default Catalog;
