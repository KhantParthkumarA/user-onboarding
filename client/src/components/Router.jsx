import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signin from './signin'
import Signup from './signup'
import Home from './Home'
import { PrivateRoute } from './PrivateRoute';

const RouterComponent = () => {
  return (
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
  );
}

export default RouterComponent;
