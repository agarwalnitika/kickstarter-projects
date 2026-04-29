import React, { useEffect, useState } from "react";
import ContentWrapper from "./components/ContentWrapper";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { API_URL } from "./constants/commonConstants";
import LandingWrapper from "./common-components/LandingWrapper";
import "./App.css";

function App() {
  // const [projectsData, setProjectsData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [finalObject, setFinalObject] = useState([]);

  const array = [4, 5, 1, 7, 9, 6, 2];
  // const convertFileType = (
  //   currentFileSize: Number,
  //   currentFileType: "byte" | "kb" | "mb" | "gb" | "tb" | "bit",
  //   conversionFileType: "byte" | "kb" | "mb" | "gb" | "tb" | "bit"
  // ) => {
  //   const conversionMapping = {
  //     "kb": {
  //       "mb": 1/1024,
  //       "gb": 1/(1024 * 1024)
  //     },
  //     "mb": {
  //       "kb": 1024,
  //       "gb": 1/1024
  //     }
  //   }

  //   const convertedFileType =
  //     conversionMapping[currentFileType][conversionFileType] * currentFileSize;
  // };
  // useEffect(() => {
  //   // fetch projects from API
  //   fetch(API_URL)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProjectsData(data);
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  // if (loading) return <Loader />;
  // if (error) return <h2>Error: {error}</h2>;

  // return (
  //   <div>
  //     <Header />
  //     <ContentWrapper projects={projectsData} />
  //     <Footer />
  //   </div>
  // );

  // [{title: 'Folder1', children: [{title: 'File1'}]}, {title: 'Folder-sub-1}, children:[{title:'File-sub-1}]]]

  // const array = [
  //   {
  //     title: "Folder1",
  //     children: [{ title: "File1", children: [{ title: "File2" }] }],
  //   },
  //   { title: "Folder-sub-1", children: [{ title: "file-sub-1" }] },
  // ];

  // const generateTreeLikeStructure = (sampleStructure) => {
  //   // const displayArray = [];
  //   sampleStructure.map((object) => {
  //     const symbol = object.children ? ">" : "-";
  //     const displayText = " " + symbol + object.title;
  //     console.log(displayText);

  //     // displayArray.push(displayText);
  //     if (object.children) generateTreeLikeStructure(object.children);
  //     return <div>{displayText}</div>;
  //   });

  //   // console.log(displayArray);
  //   // setFinalObject(displayArray);
  // };

  return <LandingWrapper />;
}

export default App;
