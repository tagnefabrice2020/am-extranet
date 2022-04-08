import React, { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppSpinner } from "./components";
import "../src/assets/dist/css/adminlte.css";
import "../src/assets/plugins/fontawesome-free/css/all.min.css";
//import "../src/assets/plugins/bootstrap/js/bootstrap.bundle.min.js";
//import "../src/assets/dist/js/adminlte.js";
import { Provider } from "react-redux"; 
import {store} from './store';
import GuestRoutes from "./config/GuestRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// default page layout
const DefaultLayout = lazy(() => import('./layout/defautlLayout'))

// login page layout
const Login = lazy(() => import('./views/pages/login/Login'))


function App({auth}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={AppSpinner}>
          <Routes>
          <Route
              exact
              path="*"
              name="Home"
              element={<DefaultLayout/>} 
            />
           
            <Route
              path="/login" 
              name="Login"
              element={ 
                <GuestRoutes>
                  <Login/>
                </GuestRoutes>
              } 
            />
            
          </Routes>
          <ToastContainer autoClose={5000} />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
