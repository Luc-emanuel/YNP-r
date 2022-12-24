//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/{app-name}" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
