import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../Components/AdminSidebar";
import "./AdminProductsPage.css";
import Loading from "../../Components/Loading/Loading";

const AdminProductsPage = () => {
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [subSubcategories, setSubSubCategories] = React.useState([]);
  const [brands, setBrands] = React.useState([]);

  //create product
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [subSubCategory, setSubSubCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [boughtPrice, setBoughtPrice] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [img, setImg] = React.useState([]);

  //display product
  const [products, setProducts] = React.useState([]);
  const [deletedProduct, setDeletedProduct] = React.useState("");

  React.useEffect(() => {
    axios.get("/category").then((res) => {
      setCategories(res.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("/subcategory").then((res) => {
      setSubCategories(res.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("/subsubcategory").then((res) => {
      setSubSubCategories(res.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get("/brand").then((res) => {
      setBrands(res.data);
    });
  }, []);

  React.useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    axios
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setProducts(data);
      });
    setDeletedProduct("");
  }, [deletedProduct]);

  const deleteHandler = (e, id) => {
    const { token } = JSON.parse(localStorage.getItem("userData"));

    if (window.confirm("Вы уверены?")) {
      axios
        .delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => {
          setDeletedProduct(data);
          window.M.toast({
            html: "Продукт удалён",
            classes: "loginToastYellow",
          });
        });
    }
  };

  const submitHanler = (e) => {
    e.preventDefault();

    const { token } = JSON.parse(localStorage.getItem("userData"));

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("subSubCategory", subSubCategory);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("sellPrice", sellPrice);
    formData.append("boughtPrice", boughtPrice);
    formData.append("amount", amount);
    img.length > 0 && img.map((el) => formData.append("img", el));

    axios
      .post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.M.toast({ html: "Продукт создан", classes: "loginToast" });

        setTitle("");
        setBrand("");
        setCategory("");
        setSubCategory("");
        setSubSubCategory("");
        setDescription("");
        setColor("");
        setSellPrice("");
        setBoughtPrice("");
        setAmount("");
        setImg([]);

        setDeletedProduct(res.data);
      })
      .catch((e) => {
        window.M.toast({ html: e.message, classes: "loginToastRed" });
      });
  };

  const filteredSubCategories =
    category && subCategories.filter((el) => el.category === category);

  const filteredSubSubCategories =
    subCategory &&
    subSubcategories.filter((el) => el.subCategory === subCategory);

  return (
    <div className="adminPage">
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Cоздать продукт</h4>
          <form
            className="col m6 offset-m3"
            style={{ padding: "0 2rem" }}
            onSubmit={(e) => submitHanler(e)}
          >
            <div className="row">
              <div className="input-field col s12">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="browser-default"
                >
                  <option value="" disabled>
                    Категория
                  </option>
                  {categories.length > 0 &&
                    categories.map((el) => (
                      <option key={el._id} value={el.categoryName}>
                        {el.categoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="browser-default"
                  disabled={category ? false : true}
                >
                  <option value="" disabled>
                    Подкатегория
                  </option>
                  {filteredSubCategories.length > 0 &&
                    filteredSubCategories.map((el) => (
                      <option key={el._id} value={el.subCategoryName}>
                        {el.subCategoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <select
                  value={subSubCategory}
                  onChange={(e) => setSubSubCategory(e.target.value)}
                  className="browser-default"
                  disabled={subCategory ? false : true}
                >
                  <option value="" disabled>
                    Подподкатегория
                  </option>
                  {filteredSubSubCategories.length > 0 &&
                    filteredSubSubCategories.map((el) => (
                      <option key={el._id} value={el.subSubCategoryName}>
                        {el.subSubCategoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="browser-default"
                >
                  <option value="" disabled>
                    Бренд
                  </option>
                  {brands.length > 0 &&
                    brands.map((el) => (
                      <option key={el._id} value={el.brandName}>
                        {el.brandName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="title"
                  type="text"
                  required
                  className="validate"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="title">Название товара</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field colorcol s12">
                <textarea
                  id="description"
                  type="text"
                  required
                  className="validate materialize-textarea"
                  data-length="120"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="description">Описание</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="color"
                  type="text"
                  required
                  className="validate"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <label htmlFor="color">Цвет</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="sellPrice"
                  type="number"
                  required
                  className="validate"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                />
                <label htmlFor="sellPrice">Цена покупки</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="boughtPrice"
                  type="number"
                  required
                  className="validate"
                  value={boughtPrice}
                  onChange={(e) => setBoughtPrice(e.target.value)}
                />
                <label htmlFor="boughtPrice">Цена продажи</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="amount"
                  type="text"
                  required
                  className="validate"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="amount">Количество</label>
              </div>
            </div>

            <div className="row">
              <div className="file-field input-field col s12">
                <div className="btn">
                  <span>Изображения</span>
                  <input
                    type="file"
                    required
                    multiple
                    onChange={(e) => setImg([...e.target.files])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <button
                  className="btn waves-effect waves-green green btn-flat"
                  type="submit"
                >
                  Создать
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
      <AdminSidebar />
      <div className="adminProductsPage">
        <div className="adminProductsPageHeader">
          <p className="adminProductPageTitle">Все продукты</p>
          <button
            data-target="modal1"
            className="btn modal-trigger right-align"
            onClick={(e) => {
              const elem = document.querySelectorAll(".modal");
              window.M.Modal.init(elem);
            }}
          >
            Создать продукт
          </button>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>№</th>
              <th>Товар</th>
              <th>Категория</th>
              <th>Подкатегория</th>
              <th>Подподкатегория</th>
              <th>Название товара</th>
              <th>Бренд</th>
              <th>цена покупки</th>
              <th>цена продажи</th>
              <th>Количество</th>
              <th>Дата выхода товара</th>
              <th>Изменить</th>
              <th>Удалить</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 &&
              products.map((product, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <th>
                    <img
                      style={{ width: "50px" }}
                      src={`/${product.img[0]?.path}`}
                      alt={product.title}
                    />
                  </th>
                  <th>{product.category}</th>
                  <th>{product.subCategory}</th>
                  <th>{product.subSubCategory}</th>
                  <th>
                    <Link
                      className="black-text hover-effect"
                      to={`/product/${product._id}`}
                    >
                      {product.title}
                    </Link>
                  </th>
                  <th>{product.brand}</th>
                  <th>{product.boughtPrice}</th>
                  <th>{product.sellPrice}</th>
                  <th>{product.amount}</th>
                  <th>
                    {new Intl.DateTimeFormat("ru-RU").format(
                      new Date(product.createdAt)
                    )}
                  </th>
                  <th>
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="btn yellow accent-4 waves-effect waves-light"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={(e) => deleteHandler(e, product._id)}
                      className="btn deep-orange darken-1 waves-effect waves-light"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {products.length === 0 && <Loading />}
      </div>
    </div>
  );
};

export default AdminProductsPage;
