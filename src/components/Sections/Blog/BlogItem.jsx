import css from './BlogItem.module.css';
import Icon from '../../UI/Icon';
import { Link, useRouteMatch } from 'react-router-dom';

export default function BlogItem({ blog: b, singlePage }) {
  const match = useRouteMatch();
  // console.log(match);
  return (
    <article
      className={`${css['blog-item']} ${singlePage ? css.singlePage : ''}`}
    >
      {singlePage && <h1 className={css['main-title']}>{b.title}</h1>}
      <img
        src={process.env.REACT_APP_STRAPI_URL + b.image?.url}
        alt={b.title}
      />
      {!singlePage && <h3 className='title'>{b.title}</h3>}
      {/* TODO: panaudoti summary, jei nera tada nukirpri pagr text */}
      <p>{singlePage ? b.text : b.summary}</p>
      {b.address && (
        <address>
          <strong>
            <Icon icon='map-marker' />
            Headquaters:
          </strong>{' '}
          <a href='http://google.com' target='_blank' rel='noreferrer'>
            {b.address}
          </a>
        </address>
      )}
      {/* match.url - grazina dabartini url adresa */}
      {!singlePage && (
        <Link to={`${match.path}/${b.id}`}>
          View details <Icon icon='long-arrow-right' />
        </Link>
      )}
      {singlePage && <Link to='/blog'>Go back</Link>}
    </article>
  );
}
