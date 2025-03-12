import React, { useEffect, useState } from "react";
import ContentWrapper from "./components/ContentWrapper";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { API_URL } from "./constants/commonConstants";

function App() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch projects from API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setProjectsData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) return <Loader />;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <Header />
      <ContentWrapper projects={projectsData} />
      <Footer />
    </div>
  );
}

export default App;
