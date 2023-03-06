import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Detail, Form, Home, Landing } from "./views/index";

function App() {
//TODO OK

  return (
    <div className="App">
      {/* {location.pathname !== '/' && <NavBar />} */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe" element={<Form />} />
        <Route path="/recipes/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
