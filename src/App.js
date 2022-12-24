//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";

const App = () => {
  console.log(
    " -- ",
    window.location,
    " -- ",
    window.location.pathname,
    " -- "
  );
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
