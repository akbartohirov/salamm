import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CatalogProductItem from "../Components/CatalogProductItem";

const Brands = () => {
  const [brand, setBrand] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/brand/${id}`).then((res) => {
      console.log(res.data);
      setBrand(res.data);
    });
  }, [id]);

  React.useEffect(() => {
    axios.get(`/products`).then((res) => {
      console.log(res.data);
      if (brand.brandName) {
        const filter = res.data.filter((el) => el.brand === brand.brandName);
        setProducts(filter);
      }
    });
  }, [brand.brandName]);

  return (
    <div className="container">
      {brand.brandName && <h3> Товары по бренду "{brand.brandName}" </h3>}
      {
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
      }
    </div>
  );
};

export default Brands;
