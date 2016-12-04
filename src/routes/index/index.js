import HomeLayout from 'layouts/HomeLayout';
import count from './count';
import about from './about';

export default {
  path: '/',
  component: HomeLayout,
  indexRoute: {component: count.component},
  childRoutes: [
    about,
    count
  ]
}
