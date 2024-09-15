import './App.css';
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
