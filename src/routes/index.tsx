import { ElementType, lazy, Suspense } from 'react'
import { useRoutes, RouteObject } from "react-router-dom";
import { Route } from './path';
import { Loading } from '../components/Loading';
import { Container } from '@mui/material';

const Loadable = (Component: ElementType) => () => {
  return (
    <Suspense fallback={<Loading />}>
        <Container maxWidth="md" sx={{ marginTop: '20px' }}>
          <Component />
        </Container>
    </Suspense>
  );
};

const Home = Loadable(lazy(() => import('../pages/Home')));
const Create = Loadable(lazy(() => import('../pages/Create')));
const Update = Loadable(lazy(() => import('../pages/Update')));

const Routes = () => {
    const router: RouteObject[] = [
      {
        path: Route.all,
        element: <Home />,
      },
      {
        path: Route.root,
        element: <Home />,
      },
      {
        path: Route.create,
        element: <Create />
      },
      {
        path: Route.update,
        children: [
          {
            path: Route.id,
            element: <Update />
          }
        ]
      }
    ]

    return useRoutes(router);
}

export default Routes;