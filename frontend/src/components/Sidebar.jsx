import EmploymentType from "./EmploymentType"
import JobPosting from "./JobPosting"
import Location from "./Location"
import Salary from "./Salary"
import WorkExperience from "./WorkExperience"



const Sidebar = ({handleChange, handleClick}) => {




    return (
    <div className="space-y-5">
        <h3 className="text-lg font-bold mb-2">Filters</h3>
        <Location handleChange={handleChange} />
        <Salary handleChange={handleChange} handleClick={handleClick} />
        <JobPosting handleChange={handleChange} />
        <WorkExperience handleChange={handleChange}/>
        <EmploymentType handleChange={handleChange}/>

    </div>
  )
}

export default Sidebar