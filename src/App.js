import React from "react";
import examsData from "./examData.js";
import Exam from "./components/Exams.js";
import Navbar from "./components/Navbar";
import Home from "./components/Home.js"

function App() {
  const [data, setData] = React.useState([]);
  const [home, setHome] = React.useState(true);
  const [findExams, setfindExams] = React.useState(false);
  const [filteredClasses, setFilteredClasses] = React.useState([]);
  const [search, setSearch] = React.useState({
    classOne: "",
    classTwo: "",
    classThree: "",
    classFour: "",
    classFive: "",
  });

  function setPage(page){
    if(page === "Home"){
      setHome(true)
      setfindExams(false)
    }
    if(page === "Exams"){
      setHome(false)
      setfindExams(true)
    }
  }

  React.useEffect(() => {
    setData(examsData[0].data); // Access the 'data' array from the first object in examsData
  }, []);

  React.useEffect(() => {
    // Function to split input into search terms
    const getSearchTerms = (input) =>
      input
        .split(/\s+/) // Split by whitespace
        .filter((term) => term !== ""); // Remove empty terms

    // Create separate arrays for each search class value
    const searchTerms = {
      classOne: getSearchTerms(search.classOne),
      classTwo: getSearchTerms(search.classTwo),
      classThree: getSearchTerms(search.classThree),
      classFour: getSearchTerms(search.classFour),
      classFive: getSearchTerms(search.classFive),
    };


    // Filter data based on subject, courseno, and section fields
    const filteredResults = Object.entries(searchTerms).map(([key, terms]) => {
      if (terms.length === 0) return []; // If no terms, skip filtering

      return data.filter((classSubject) => {
        const fields = ["subject", "courseno", "section"];
        const usedFields = new Set(); // Track used fields to ensure they are not reused

        return terms.every((term) => {
          // Find the first available field that matches the term
          const matchingField = fields.find(
            (field) =>
              !usedFields.has(field) && // Check if the field is not used yet
              classSubject[field]?.toLowerCase().includes(term.toLowerCase())
          );

          if (matchingField) {
            usedFields.add(matchingField); // Mark the field as used
            return true; // Term has matched, continue with next term
          }

          return false; // If no matching field is found, fail the check
        });
      });
    });

    // Combine filtered results and remove duplicates
    const combinedFiltered = Array.from(
      new Set(filteredResults.flat().map((item) => JSON.stringify(item)))
    ).map((item) => JSON.parse(item));

    // Update the state with the filtered results
    setFilteredClasses(combinedFiltered);
  }, [search, data]); // Trigger the effect when `search` or `data` changes

  function handleChange(event) {
    const { name, value } = event.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  }

  return (
    <div className="App">
      <Navbar click={setPage}/>
      {home && <Home/>}
      {findExams && <div>
        <form className="search--container">
          <input
            type="text"
            placeholder="Class One"
            className="form--search"
            name="classOne"
            value={search.classOne}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Class Two"
            className="form--search"
            name="classTwo"
            value={search.classTwo}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Class Three"
            className="form--search"
            name="classThree"
            value={search.classThree}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Class Four"
            className="form--search"
            name="classFour"
            value={search.classFour}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Class Five"
            className="form--search"
            name="classFive"
            value={search.classFive}
            onChange={handleChange}
          />
        </form>
        <h1 className="table--header"> Your Exams</h1>
        <table className="exam--table">
          <thead>
            <tr>
              <th>Dept.</th>
              <th>Course</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>Duration (Min)</th>
              <th>End Date</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((temp, index) => (
                <Exam
                  key={`${temp.dept}-${temp.courseno}-${temp.section}-${index}`}
                  examInfo={temp}
                />
              ))
            ) : (
              <tr>
                <td colSpan="9">No exams found. <i>e.g: BUSI 1001 R</i></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default App;





/*
  React.useEffect(function(){
    console.log("Effect ran")
    fetch(`https://apistore1.carleton.ca/api/v1/exams/calendar?api-key=379108148162756108FBBCDCD2D8A29D3AFB0B3104F3C8A6DD0C9C9543C68CBE100027399230&_=1724026612748`)
        .then(res => res.json())
        .then(examsData => setData(examsData.data))
},[])
*/