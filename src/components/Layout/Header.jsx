import css from './Header.module.css';
import { useState, useEffect, useContext, useCallback } from 'react';
import useStrapi from '../../hooks/useStrapi';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/AuthProvider';

export default function Header({ page }) {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  // console.log('header auth context', authCtx);
  const userEmail = authCtx.userInfo.email;
  // gauti context ir paimti vartotjo email
  // sekti ar dokumentas yra slenkamas zemyn
  const [navState, setNavState] = useState(false);
  const [menuItems] = useStrapi('/canvas-menus');

  // jei nesam prisilogine tai isfiltruoti members only page kurio id 8

  // const filteredMenuItems = menuItems.filter((item) => item.id !== 8);
  // const finalMenuItems = userEmail ? menuItems : filteredMenuItems;
  // const match = useRouteMatch();
  // useEffect(() => {
  //   console.log('match', match);
  // }, [match]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll(e) {
    const dist = window.pageYOffset;
    // console.log('scroll ', dist);
    if (dist > 200) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  }
  // if (isLoading) return <header>Loading ...</header>;
  // header dalyje kai prisiloginam mes parodom user email navigacijoj
  function logoutHandler(e) {
    e.preventDefault();
    console.log('prevented');
    authCtx.logout();
    history.push('/');
  }
  return (
    <header
      className={`${css.header} ${
        navState || page !== 'home' ? css.active : ''
      } `}
    >
      <Link className={css.logo} to='/'>
        Canvas<strong>Store</strong>
      </Link>
      <nav className={css['main-nav']}>
        {menuItems.map((l) => (
          <Link key={l.link} to={l.link}>
            {l.title}
          </Link>
        ))}
      </nav>
      <nav className={css['side-nav']}>
        {userEmail ? (
          <a onClick={logoutHandler} href='/logout'>
            Logout {userEmail}
          </a>
        ) : (
          <Link to='/login'>SignUp/Login</Link>
        )}

        <a href='/'>Cart</a>
      </nav>
    </header>
  );
}
