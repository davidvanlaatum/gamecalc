import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './Header';
import MedievalDynasty from './MedievalDynasty';

const basename = (import.meta.env.VITE_BASE_PATH ?? '/') as string;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path={'/medieval_dynasty'} element={<MedievalDynasty />} />
    </Route>,
  ),
  { basename },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
