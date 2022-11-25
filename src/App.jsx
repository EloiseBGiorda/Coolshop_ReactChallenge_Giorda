import logo from "./logo.svg";
import "./App.css";
import Calculator from "./component/Calculator";

function App() {
  return (
    <>
      <nav class="navbar navbar-light bg-dark">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 text-light">React Calculator</span>
        </div>
      </nav>
      <Calculator />
    </>
  );
}

export default App;
