import React, { lazy, Suspense, PureComponent } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loader from "./shared/components/Loader";

const CartPage = lazy(() => import("./pages/CartPage"));
const ProductDescPage = lazy(() => import("./pages/ProductDescPage"));
const ProductListPage = lazy(() => import("./pages/ProductListPage"));

class MyRoutes extends PureComponent {
  render() {
    return (
      <div>
        <Provider>
          <Suspense fallback={<Loader isEnabled={true} />}>
            <BrowserRouter>
              <Routes>
                <Route path="/:id" element={<ProductListPage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route index element={<ProductListPage />}></Route>
                <Route
                  path="/details/:id"
                  element={<ProductDescPage />}
                ></Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </Provider>
      </div>
    );
  }
}

export default MyRoutes;
