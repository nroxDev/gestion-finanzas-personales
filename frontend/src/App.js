import './App.css';
import FormularioRegistro from './componentes/formulario-registro/formulario-registro';

function App() {
  return (
    <div className="App">

      <FormularioRegistro alTenerDatosCompletos={(datos) => {
        console.log('----------> datos', datos)
      }} />

    </div>
  );
}

export default App;
