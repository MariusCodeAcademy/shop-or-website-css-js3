import css from './FooterTop.module.css';

export default function FooterTop() {
  return (
    <div className={`container ${css.footer}`}>
      <div className={css.col}>
        <h3>Antraste</h3>
        <a href='/'>Kazkur</a>
        <a href='/'>Kazkur</a>
        <a href='/'>Kazkur</a>
      </div>
      <div className={css.col}>
        <h3>Antraste</h3>
        <a href='/'>Kazkur</a>
        <a href='/'>Kazkur</a>
        <a href='/'>Kazkur</a>
      </div>
    </div>
  );
}
