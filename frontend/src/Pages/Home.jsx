import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../components/Sidebar";
import RightSideBar from "../components/RightSideBar";

const Home = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        console.log(data);
      });
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle?.toLowerCase().indexOf(query?.toLowerCase()) !== -1
  );

  //radio filtering
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // button based filters
  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
    console.log("select category");
    
  };

  //main task

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems;
    }
    //category
    console.log(selected);
    
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>{
          const selectedDateObj = new Date(selected);
          const postingDateObj = new Date(postingDate);


          return(
            jobLocation?.toLowerCase() === selected?.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDateObj >= selectedDateObj
||
          salaryType?.toLowerCase() === selected?.toLowerCase() ||
          employmentType?.toLowerCase() === selected?.toLowerCase() || 
          experienceLevel?.toLowerCase() === selected?.toLowerCase() 
          )
        }
          
      );
    }

    //pagination
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card data={data} key={i} />);
  };

  // pagination
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage +1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div className="text-primary">
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 py-12 px-4">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className="col-span-2 rounded bg-white p-4">
          {loading ? <h1>Loading...</h1> : <Jobs result={result} />}
         
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage}
              disabled={currentPage === 1}
              className="hover:underline"
              
              >Previous</button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} 
              className="hover:underline"
              >Next</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bg-white p-4 rounded"><RightSideBar /></div>
      </div>
    </div>
  );
};

export default Home;
