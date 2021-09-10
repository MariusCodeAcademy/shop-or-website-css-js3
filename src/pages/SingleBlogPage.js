import { useParams } from 'react-router';
import BlogItem from '../components/Sections/Blog/BlogItem';
import useStrapi from '../hooks/useStrapi';
import useAuthCtx from '../hooks/useAuthCtx';

export default function SingleBlogPage({ membersOnly, kind }) {
  const authCtx = useAuthCtx();
  const token = (kind === 'paid' && authCtx.token) || null;
  const { blogId } = useParams();
  // console.log('params', blogId);
  const correctRequestAddress = membersOnly
    ? 'canvas-paid-blogs'
    : 'canvas-blogs';
  const [blogObj] = useStrapi(`/${correctRequestAddress}/${blogId}`, token);
  // console.log(blogObj);
  /// useStrapi hook
  // get data, pass data as blog

  return (
    <section className='container'>
      <h1>single</h1>
      <BlogItem singlePage blog={blogObj} />
    </section>
  );
}
