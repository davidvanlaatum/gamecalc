import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './Header';
import MedievalDynasty from './MedievalDynasty';

const basename = process.env.REACT_APP_BASE_PATH || '/';

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
