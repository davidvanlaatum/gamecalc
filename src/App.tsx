import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './Header';
import MedievalDynasty from './MedievalDynasty';
import NotFound from '@/controls/NotFound.tsx';
import ErrorPage from '@/controls/ErrorPage.tsx';

const basename = (import.meta.env.VITE_BASE_PATH ?? '/') as string;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route ErrorBoundary={ErrorPage}>
        <Route index element={<Home />} />
        <Route path={'/medieval_dynasty'} element={<MedievalDynasty />} />
        {/* keep last*/}
        <Route Component={NotFound} path="*" />
      </Route>
    </Route>,
  ),
  { basename },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
