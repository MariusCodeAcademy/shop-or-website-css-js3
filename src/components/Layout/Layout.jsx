import Footer from './Footer/Footer';
import Header from './Header';
import css from './Layout.module.css';

export default function Layout({ children, page }) {
  return (
    <>
      <Header page={page} />
      {/* {page === 'blog' && <aside>Info about blogs</aside>} */}
      {children}
      <Footer />
    </>
  );
}
