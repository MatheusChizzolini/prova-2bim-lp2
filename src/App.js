import { Menu } from "./componentes/menu";
import store from "./redux/store.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import TelaUsuario from "./componentes/telas/tela-usuario.jsx";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/usuarios" element={<TelaUsuario />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
