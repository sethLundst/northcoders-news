import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import {
  Articles,
  ArticleView,
  Error,
  Navbar,
  ThemeProvider,
} from "./components";
import { UserProvider } from "./contexts/UserContext";
import { useFetchArticles } from "./hooks";

function App() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("All");
  const [filter, setFilter] = useState("");

  const [params, setParams] = useState({
    limit: 20,
    p: 1,
    topic: selected === "All" ? "" : selected.toLowerCase(),
  });

  return (
    <ThemeProvider>
      <UserProvider>
        <Navbar
          filter={filter}
          setFilter={setFilter}
          params={params}
          setParams={setParams}
          selected={selected}
          setSelected={setSelected}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Articles
                filter={filter}
                setFilter={setFilter}
                params={params}
                setParams={setParams}
                selected={selected}
              />
            }
          />
          <Route path="/articles/:article_id" element={<ArticleView />} />
          <Route path="/loading" />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
