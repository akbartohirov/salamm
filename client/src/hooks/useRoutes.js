import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../pages/Register";
import Auth from "../pages/Auth";
import Basket from "../pages/Basket";
import Dashboard from "../pages/Dashboard";
import MainPage from "../pages/MainPage";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Products from "../pages/Products";
import CatalogProduct from "../pages/CatalogProduct";
import AdminUsersPage from "../pages/adminpages/AdminUsersPage";
import AdminProductsPage from "../pages/adminpages/AdminProductsPage";
import AdminOrdersPage from "../pages/adminpages/AdminOrdersPage";
import AdminUserDetailsPage from "../pages/adminpages/admindetailspage/AdminUserDetailsPage";
import AdminProductDetailsPage from "../pages/adminpages/admindetailspage/AdminProductDetailsPage";
import AdminOrderDetailsPage from "../pages/adminpages/admindetailspage/AdminOrderDetailsPage";
import AdminCategoryPage from "../pages/adminpages/AdminCategoryPage";
import AdminCategoryDetailsPage from "../pages/adminpages/admindetailspage/AdminCategoryDetailsPage";
import AdminSubCategoryPage from "../pages/adminpages/AdminSubCategoryPage";
import AdminSubCategoryDetailsPage from "../pages/adminpages/admindetailspage/AdminSubCategoryDetailsPage";
import AdminSubSubCategoryPage from "../pages/adminpages/AdminSubSubCategoryPage";
import AdminSubSubCategoryDetailsPage from "../pages/adminpages/admindetailspage/AdminSubSubCategoryDetailsPage";
import AdminCompaniesPage from "../pages/adminpages/AdminCompaniesPage";
import AdminBrandsPage from "../pages/adminpages/AdminBrandsPage";
import AdminBrandDetailsPage from "../pages/adminpages/admindetailspage/AdminBrandDetailsPage";
import Brands from "../pages/Brands";
import AdminOnlyAddProduct from "../pages/adminpages/AdminOnlyAddProduct";
import AdminOnlyViewOrders from "../pages/adminpages/AdminOnlyViewOrders";
import AdminBannerPage from "../pages/adminpages/AdminBannerPage";
import AdminCarouselPage from "../pages/adminpages/AdminCarouselPage";
import AdminCarouselDetailsPage from "../pages/adminpages/admindetailspage/AdminCarouselDetailsPage";
import Ordered from "../pages/Ordered";

const useRoutes = (isAuthenticated, user, addProduct, orderViewer) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route exact path="/basket">
          <Basket />
        </Route>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        <Route exact path="/catalog">
          <Catalog />
        </Route>

        <Route exact path="/category/:id">
          <CatalogProduct />
        </Route>

        <Route path="/product/:id">
          <Product />
        </Route>

        <Route path="/brand/:id">
          <Brands />
        </Route>

        <Route path="/products/:id">
          <Products />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/ordered/:id">
          <Ordered />
        </Route>

        {addProduct && (
          <>
            <Route exact path="/admin/onlyaddproduct">
              <AdminOnlyAddProduct />
            </Route>
            <Route exact path="/admin/products/:id">
              <AdminProductDetailsPage />
            </Route>
          </>
        )}

        {orderViewer && (
          <>
            <Route exact path="/admin/onlyorderview">
              <AdminOnlyViewOrders />
            </Route>
            <Route exact path="/admin/orders/:id">
              <AdminOrderDetailsPage />
            </Route>
          </>
        )}

        {user && (
          <>
            <Route exact path="/admin/users">
              <AdminUsersPage />
            </Route>

            <Route exact path="/admin/products">
              <AdminProductsPage />
            </Route>

            <Route exact path="/admin/orders">
              <AdminOrdersPage />
            </Route>

            <Route exact path="/admin/users/:id">
              <AdminUserDetailsPage />
            </Route>

            <Route exact path="/admin/products/:id">
              <AdminProductDetailsPage />
            </Route>

            <Route exact path="/admin/orders/:id">
              <AdminOrderDetailsPage />
            </Route>

            <Route exact path="/admin/category">
              <AdminCategoryPage />
            </Route>

            <Route exact path="/admin/category/:id">
              <AdminCategoryDetailsPage />
            </Route>

            <Route exact path="/admin/subcategory">
              <AdminSubCategoryPage />
            </Route>

            <Route exact path="/admin/subcategory/:id">
              <AdminSubCategoryDetailsPage />
            </Route>

            <Route exact path="/admin/subsubcategory">
              <AdminSubSubCategoryPage />
            </Route>

            <Route exact path="/admin/subsubcategory/:id">
              <AdminSubSubCategoryDetailsPage />
            </Route>

            <Route exact path="/admin/brands">
              <AdminBrandsPage />
            </Route>

            <Route exact path="/admin/brands/:id">
              <AdminBrandDetailsPage />
            </Route>

            <Route exact path="/admin/banner">
              <AdminBannerPage />
            </Route>

            <Route exact path="/admin/banner/:id">
              <AdminBrandDetailsPage />
            </Route>

            <Route exact path="/admin/companies">
              <AdminCompaniesPage />
            </Route>

            <Route exact path="/admin/carousels">
              <AdminCarouselPage />
            </Route>

            <Route exact path="/admin/carousel/:id">
              <AdminCarouselDetailsPage />
            </Route>
          </>
        )}
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/login">
        <Auth />
      </Route>

      <Route exact path="/catalog">
        <Catalog />
      </Route>

      <Route exact path="/category/:id">
        <CatalogProduct />
      </Route>

      <Route path="/product/:id">
        <Product />
      </Route>

      <Route exact path="/basket">
        <Basket />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>

      <Route path="/products/:id">
        <Products />
      </Route>

      <Route path="/brand/:id">
        <Brands />
      </Route>
      {/* <Redirect to="/" /> */}
    </Switch>
  );
};

export default useRoutes;
