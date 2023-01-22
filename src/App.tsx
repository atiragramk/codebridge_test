import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ArticleList = lazy(() => import("./pages/ArticleList"));
const ArticleListItem = lazy(() => import("./pages/ArticleListItem"));
const Page404 = lazy(() => import("./pages/404"));

function App() {
  return (
    <>
      <Suspense>
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<ArticleList />} />
              <Route path="/:articleId" element={<ArticleListItem />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
