import Signup from "pages/Signup";
import Layout from "./layouts/Layout";
import React, { } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Switch,
  useHistory
} from "react-router-dom";
import Login from "pages/Login";
import { autoLogin } from "store/user-actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "layouts/Loading";
import { userActions } from "store/user-slice";
import Search from "pages/Search";
import Create from "pages/Create/Create";
import ViewGadget from "pages/Create/mini-pages/ViewGadget";
import MyProfile from "pages/MyProfile";
import { motion, AnimatePresence } from 'framer-motion';


const App = (props) => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.user.isConnected);
  const loading = useSelector((state) => state.user.loading);
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    const jwtoken = localStorage.getItem('jwtoken');
    if (jwtoken)
      dispatch(autoLogin(history));
    else
      dispatch(userActions.setLoading(false));
  }, [])

  React.useEffect(() => {
    if (isConnected) {
      history.push('/search')
    } else {
      if (window.location.pathname != '/signup' && window.location.pathname != '/login') {
        history.push('/login')
      }
    }
  }, [isConnected])


//  <Routes location={location} key={location.pathname}>
//     {!isConnected && <Route path="/signup" element={<Signup />} />}
//     {!isConnected && <Route path="/login" element={<Login />} />}
//     <Route path="/create" element={isConnected ? <Create /> : <Login />} />
//     <Route path="/search" element={isConnected ? <Search /> : <Login />} />
//     <Route path="/edit/:gadget_name" element={isConnected ? <Create /> : <Login />} />
//     <Route path="/view/:gadget_name" element={isConnected ? <ViewGadget /> : <Login />} />
//     <Route path="/myProfile" element={isConnected ? <MyProfile /> : <Login />} />

//   </Routes>

  return (
      <Layout>
        <AnimatePresence exitBeforeEnter >
          {loading ? 
            <Loading />
            : 
            <Switch location={location} key={location.key}>
              <Route path="/login"><Login /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/search"><Search /></Route>
              <Route path="/create"><Create /></Route>
              <Route path="/edit/:gadget_name"><Create /></Route>
              <Route path="/view/:gadget_name"><Create /></Route>
              <Route path="/myProfile"><MyProfile /></Route>
            </Switch>
          }
        </AnimatePresence>
      </Layout> 


  )
}


export default App;
