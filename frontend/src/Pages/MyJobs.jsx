import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = useState(5)

  const user = JSON.parse(localStorage.getItem('user'))


  // pagination
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs= jobs.slice(indexOfFirstJob, indexOfLastJob)


  const nextPage = ()=>{
    if(indexOfLastJob < jobs.length){
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = ()=>{
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const fetchJobs = ()=>{
    setLoading(true);
    fetch(`http://localhost:8000/jobs/${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data)
        setLoading(false)
      });
  }
  useEffect(() => {
    fetchJobs()

    
  }, [searchText]);

  console.log(searchText);

  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );

    console.log(filter);
    setJobs(filter);
    setLoading(false);
  };
  console.log(jobs);

  const handleDelete = (id) => {
    console.log(id);
    setLoading(true)


    fetch(`http://localhost:8000/job/${id}`, {
      method: 'POST'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Job deleted:', data);
        // Update the jobs state to remove the deleted job
        fetchJobs()
      })
      .catch(error => {
        console.error('Error deleting job:', error);
      });
      setLoading(false)
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="">
        <h1 className="text-center p-4">All My Jobs</h1>
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col my-8">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="flex justify-between px-5 my-3">
              <div className="font-bold">
              All Jobs

              </div>
              <div >
                <Link to="/post-job" className="bg-blue p-2 text-white">                Post New Job
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full min-h-[450px] divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      NO
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      TITLE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      COMPANY NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      SALARY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      EDIT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      DELETE
                    </th>
                  </tr>
                </thead>
                {
                  loading ? (<div className="flex items-center justify-center h-20">Loading...</div>) :
                  (
                    <tbody className="divide-y divide-gray-200">
                    {
                      jobs.map((job, index)=>{
  
  
                        return(
                          <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {index +1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {job.jobTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {
                          job.companyName
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {
                          job.minPrice
                        }$ - {
                          job.maxPrice
                        }$
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <Link to={`/edit-job/${job?._id}`}>
                          Edit
                          </Link>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none bg-red-700 p-3
                          text-white
                          "
                          onClick={()=> handleDelete(job?._id)}
                        >
                                                
  
                          Delete
                          
                        </button>
                      </td>
                    </tr>
  
                        )
                      })
                    }
                    
                    
                  </tbody>
                  )
                }
               
              </table>
            </div>
          </div>
        </div>


        <div className="flex justify-center text-black space-x-8">
        {
          currentPage > 1 && (
            <button className="hover:underline">Previous</button>
          )
        }
        {
          indexOfLastJob < jobs.length && (
            <button className="hover:underline">Next</button>
          )
        }

      </div>
      </div>

      
    </div>
  );
};

export default MyJobs;
