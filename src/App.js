import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Routes from "./routes/Routes";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loader";
function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuth } = useAuth();
  const readSession = async () => {
    setLoading(true);
    try {
      const result = await isAuth();
      if (result.data.auth) {
        setAuth(true);
        setLoading(false);
      } else {
        setAuth(false);
        setLoading(false);
      }
    } catch (error) {
      setAuth(false);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    readSession();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
