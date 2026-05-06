import type { RouteObject } from 'react-router-dom';
import App from '../App';
import { Audit } from '../pages/Audit';
import { Home } from '../pages/Home';
import { Results } from '../pages/Results';
import { Share } from '../pages/Share';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'audit', element: <Audit /> },
      { path: 'results', element: <Results /> },
      { path: 'share', element: <Share /> },
    ],
  },
];
