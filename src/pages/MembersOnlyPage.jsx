import Blog from '../components/Sections/Blog/Blog';
import Layout from '../components/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import SingleBlogPage from './SingleBlogPage';

export default function MembersOnlyPage() {
  return (
    <Layout page='blog'>
      <Switch>
        <Route path='/membersonlypage/:blogId'>
          <SingleBlogPage membersOnly />
        </Route>
        <Route path='/membersonlypage'>
          <Blog kind='paid' />
        </Route>
      </Switch>
    </Layout>
  );
}

// prideti ta psl i menu

// sukurti ji taip kad jis pasisiustu mokamus straipsnius

// padaryti nuoroda i members page

// rodyti nuoroda tik kai esam prisilogine
