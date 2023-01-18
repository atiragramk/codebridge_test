import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ArticleList = lazy(() => import("./pages/ArticleList"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<ArticleList />} />
            <Route path="/:articleId" />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
