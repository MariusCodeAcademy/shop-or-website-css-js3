import '../style/App.css';
import 'font-awesome/css/font-awesome.css';
import Layout from './Layout/Layout';

import HomePage from '../pages/HomePage';
import BlogPage from '../pages/BlogPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AuthProvider from '../store/AuthProvider';
import MembersOnlyPage from '../pages/MembersOnlyPage';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from '../pages/RegisterPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <button onClick={btnHandler}>Get ref</button> */}
        <Switch>
          <ProtectedRoute path='/membersonlypage'>
            <MembersOnlyPage />
          </ProtectedRoute>
          <Route path='/blog'>
            <BlogPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
