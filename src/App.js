import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./Routes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, getUser } from "./store/actions/userActions";
import jwt_decode from "jwt-decode";

function App() {
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userAuth);
  useSelector((state) => console.log("state => ", state));
  const { user } = userdata;

  return (
    <div className="App">
      <Routes>
        {ROUTES.map(({ path, Component, isPrivate, item, role }) => {
          console.log(role);
          return (
            <Route
              exact
              path={path}
              component={Component}
              key={item}
              element={
                isPrivate ? (
                  //   role === "admin" && user?.isUser === "admin" ? (
                  //     <AdminPrivateRoutes role={role}>
                  //       <Component />
                  //     </AdminPrivateRoutes>
                  //   ) : (
                  <PrivateRoutes role={role}>
                    <Component />
                  </PrivateRoutes>
                ) : (
                  // )
                  <PublicRoutes>
                    <Component />
                  </PublicRoutes>
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
