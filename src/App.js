import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
import Login from "./components/Login";
//import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          {/* <Route path="/Signup" element={<Signup />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World</h1>
//     </div>
//   );
// }

// export default App;
