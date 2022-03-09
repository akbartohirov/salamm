import React from "react";
import axios from "axios";
import { useLocation, useParams, Link } from "react-router-dom";
import "./CatalogProduct.css";
import Loading from "../Components/Loading/Loading";

const CatalogProduct = () => {
  const [category, setCategory] = React.useState({});
  const [subCategories, setSubCategories] = React.useState([]);
  const [subSubCategories, setSubSubCategories] = React.useState([]);

  const { id } = useParams();

  const location = useLocation();

  const useQuery = () => new URLSearchParams(location.search);

  let query = useQuery();

  const subcategory = query.get("subcategories");

  React.useEffect(() => {
    axios.get(`/category/${id}`).then(({ data }) => {
      setCategory(data);
    });
  }, [id]);

  React.useEffect(() => {
    axios.get("/subcategory").then((res) => {
      setSubCategories(res.data);
    });
  }, [category]);

  React.useEffect(() => {
    axios.get("/subsubcategory").then((res) => {
      setSubSubCategories(res.data);
    });
  }, []);

  console.log();

  return (
    <div className="container">
      {subCategories.length === 0 && <Loading />}
      <div className="row mb-3">
        {subcategory ? (
          <>
            <Link
              style={{
                display: "flex",
                width: "80px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="mt-3"
              to={location.pathname}
            >
              <i className="small material-icons">chevron_left</i>
              Назад
            </Link>
            <h4 style={{ fontWeight: 500, marginBottom: "2rem" }}>
              {subCategories.length &&
                subCategories.find((el) => el._id === subcategory)
                  ?.subCategoryName}
            </h4>
            <div className="subsubcategories">
              {subSubCategories.length &&
                subSubCategories
                  .filter(
                    (el) =>
                      el.subCategory ===
                      subCategories.find((el) => el._id === subcategory)
                        ?.subCategoryName
                  )
                  .map((item) => (
                    <Link
                      to={`/products/${item._id}`}
                      style={{ color: "#000", fontSize: "16px" }}
                      className="subsubcategory__item link__hover"
                      key={item._id}
                    >
                      {" "}
                      {item.subSubCategoryName}{" "}
                    </Link>
                  ))}
            </div>
          </>
        ) : (
          <>
            <Link
              style={{
                display: "flex",
                width: "80px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="mt-3"
              to={"/catalog"}
            >
              <i className="small material-icons">chevron_left</i>
              Назад
            </Link>
            <h4 style={{ fontWeight: 500, marginBottom: "2rem" }}>
              {category.categoryName}
            </h4>
            <div className="subcategory-box">
              {subCategories.length > 0 &&
                category.categoryName &&
                subCategories
                  .filter((el) => el.category === category.categoryName)
                  .map((el) => (
                    <div key={el._id} className="subcategory">
                      <div
                        className="subcategory-img"
                        style={{ width: "100px" }}
                      >
                        <img width={"40px"} src={`/${el.img.path}`} alt="" />
                      </div>
                      <div className="subcategory-content">
                        <Link
                          to={`${location.pathname}?subcategories=${el._id}`}
                        >
                          <span
                            className="link__hover"
                            style={{
                              color: "#000",
                              fontSize: "18px",
                              fontWeight: 600,
                              marginBottom: "10px",
                            }}
                          >
                            {el.subCategoryName}
                          </span>
                        </Link>
                        {subSubCategories.length > 0 &&
                          subSubCategories
                            .filter(
                              (elem) => elem.subCategory === el.subCategoryName
                            )
                            .slice(0, 3)
                            .map((item) => (
                              <Link
                                to={`/products/${item._id}`}
                                style={{ color: "#000", marginBottom: "10px" }}
                                className="subsubcategory link__hover"
                                key={item._id}
                              >
                                {" "}
                                {item.subSubCategoryName}{" "}
                              </Link>
                            ))}
                      </div>
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CatalogProduct;
