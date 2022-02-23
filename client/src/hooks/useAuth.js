import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [addProduct, setAddProduct] = useState(null);
  const [orderViewer, setOrderViewer] = useState(null);

  const login = useCallback(
    (jwtToken, id, isAdmin, isAdminAddedProduct, isAdminOrderViewer) => {
      setToken(jwtToken);
      setUserId(id);
      setUser(isAdmin);
      setAddProduct(isAdminAddedProduct);
      setOrderViewer(isAdminOrderViewer);

      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: id,
          token: jwtToken,
          user: isAdmin,
          addProduct: isAdminAddedProduct,
          orderViewer: isAdminOrderViewer,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUser(null);
    setAddProduct(null);
    setOrderViewer(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(
        data.token,
        data.userId,
        data.user,
        data.addProduct,
        data.orderViewer
      );
    }
  }, [login]);

  return { login, logout, token, userId, user, addProduct, orderViewer };
};
