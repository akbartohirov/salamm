import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CatalogProductItem from "../Components/CatalogProductItem";

const Products = () => {
  const [subsubcategory, setSubsubcategory] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState("");
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/subsubcategory/${id}`)
      .then((res) => {
        setSubsubcategory(res.data.subSubCategoryName);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
      });
  }, [id]);

  React.useEffect(() => {
    axios.get("/products").then((res) => {
      if (subsubcategory) {
        const filtered = res.data.filter(
          (el) => el.subSubCategory === subsubcategory
        );
        console.log(filtered);
        setProducts(filtered);
      }
    });
  }, [subsubcategory]);

  return (
    <div className="container">
      <h5>
        <Link to="/catalog" style={{ display: "flex", fontSize: "18px" }}>
          <i className="small material-icons">chevron_left</i>
          Назад в каталог{" "}
        </Link>
      </h5>
      {error && <h2 className="red-text"> {error} </h2>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {products.map((product) => (
          <CatalogProductItem
            key={product._id}
            data={product}
            ownstyle={{ width: "300px", margin: "0 30px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
