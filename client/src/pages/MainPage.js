import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AutoCarousel from "../Components/AutoCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MainPage.css";
import Slick from "../Components/Slick";
import CatalogProductItem from "../Components/CatalogProductItem";
import SearchProductItem from "../Components/SearchProductItem";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [banner, setBanner] = useState([]);
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    axios.get("/products?new=true").then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/products/sorted").then((res) => {
      setSortedProducts(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/banner").then((res) => {
      setBanner(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/companies").then((res) => {
      setCompanies(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/brand").then((res) => {
      setBrands(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/carousel").then((res) => {
      setCarousel(res.data);
      console.log(res.data.filter((i) => i.slidenum === "1"));
    });
  }, []);

  const [searchWord, setSearchWord] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setSearchWord(e.target.value);
  };

  const searchHandler = (e) => {
    if (searchWord.trim() !== "") {
      var elems = document.querySelectorAll(".modal");
      window.M.Modal.init(elems);

      axios
        .post(`/products/search?q=${searchWord.toLocaleLowerCase()}`)
        .then((res) => {
          setSearchedProducts(res.data);
        })
        .catch((e) => {
          setError("Товары по запросу не найдены");
          setSearchedProducts([]);
        });
    } else {
      window.M.toast({
        html: "Сначала заполните полью!",
        classes: "loginToastYellow",
      });
    }
  };

  return (
    <div className="container">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h5 className="responsive">Товары по запросу "{searchWord}"</h5>
          <hr />
          {searchedProducts.length > 0 ? (
            searchedProducts.map((item, index) => (
              <SearchProductItem key={index} data={item} />
            ))
          ) : (
            <h5>{error}</h5>
          )}
        </div>
        <div className="modal-footer">
          <span className="modal-close waves-effect waves-green btn-flat">
            Close
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${banner.length > 0 && banner[0].img.path})`,
          backgroundSize: "cover",
        }}
        className="box-image mb-3"
      >
        <Link to="/catalog">
          <div className="box-image__catalog mr-2 valign-wrapper">
            <i className="fas fa-list" style={{ marginRight: "5px" }}></i>
            <span>Каталог</span>
          </div>
        </Link>
        <div className="box-image__search valign-wrapper">
          <div className="input-field search">
            <input
              type="text"
              id="autocomplete-input"
              className="searchInput autocomplete"
              onChange={(e) => onChange(e)}
            />
            <button
              data-target={searchWord.trim() !== "" && "modal1"}
              className="search__button modal-trigger"
              onClick={(e) => searchHandler(e)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <AutoCarousel
        slides={carousel.length && carousel.filter((i) => i.slidenum === "1")}
      />
      <h4 style={{ color: "grey", fontWeight: "500" }}>Новые товары</h4>

      <Slick
        data={products && products}
        Card={CatalogProductItem}
        numSlide={4}
      />

      <AutoCarousel
        slides={carousel.length && carousel.filter((i) => i.slidenum === "2")}
      />

      <h4 style={{ color: "grey", fontWeight: "500" }}>
        Самые посещаемые товары
      </h4>
      <Slick
        data={sortedProducts && sortedProducts}
        Card={CatalogProductItem}
        numSlide={4}
      />
      <div className="brands">
        <h4 style={{ color: "grey", fontWeight: "500" }}>Популярные бренды</h4>
        <div className="brand">
          {brands &&
            brands.map((brand) => (
              <Link
                style={{ textAlign: "center" }}
                key={brand._id}
                to={`/brand/${brand._id}`}
              >
                <img
                  className="responsive"
                  src={`/${brand.img.path}`}
                  style={{ height: "150px", width: "auto", margin: "20px" }}
                  alt={brand.brandName}
                />
              </Link>
            ))}
        </div>
      </div>

      <div>
        <h4 style={{ color: "grey", fontWeight: "500" }}>Наши сотрудники</h4>
        <div className="brand">
          {companies &&
            companies.map((company) => (
              <a
                style={{ textAlign: "center" }}
                key={company._id}
                href={`${company.companyLink}`}
              >
                <img
                  className="responsive"
                  src={`/${company.img.path}`}
                  style={{ height: "150px", width: "auto", margin: "20px" }}
                  alt={company.companyLink}
                />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
