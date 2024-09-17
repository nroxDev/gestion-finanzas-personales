import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Registro from './componentes/registro/registro';
import Login from './componentes/login/login';
import Aplicacion from './componentes/aplicacion/aplicacion';
import PaginaNoEncontrada from './componentes/pagina-no-encontrada/paginaNoEncontrada';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/registro",
    element: <Registro/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path: '/',
    element: <Aplicacion />
  },
  {
    path: "*",
    element: <PaginaNoEncontrada />

  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
