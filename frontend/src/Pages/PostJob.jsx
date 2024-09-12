import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable"


const PostJob = () => {
  const [selectedOption, setSelectedOption]= useState(null)
  const navigate = useNavigate()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();


    const onSubmit = async (data) => {
      console.log(data);
    
      const formData = new FormData();
      formData.append('jobTitle', data.jobTitle);
      formData.append('companyName', data.companyName);
      formData.append('jobLocation', data.jobLocation);
      formData.append('salaryType', data.salaryType);
      formData.append('employmentType', data.employmentType);
      formData.append('experienceLevel', data.experienceLevel);
      formData.append('companyLogo', data.companyLogo[0]);
      formData.append('minPrice', data.minPrice);
      formData.append('maxPrice', data.maxPrice);
      formData.append('postingDate', data.postingDate);
      formData.append('description', data.description);
      formData.append('postedBy', data.postedBy);

      
      try {
        const response = await fetch('http://localhost:8000/jobs', { // Replace with your server URL
          method: 'POST',
          body: formData,
        });
    
        console.log(response);
        
        if (!response.ok) {
          const errorText = await response.text();

          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
    
        const result = await response.json();
        navigate("/")
        
        console.log('Success:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  

  const options =[
    {value:"JavaScript", label:"JavaScript"},
    {value:"C++", label:"C++"},
    {value:"HTML", label:"HTML"},
    {value:"CSS", label:"CSS"},
    {value:"Python", label:"Python"},
    {value:"Java", label:"Java"},
    {value:"React", label:"React"},
    {value:"Node.js", label:"Node.js"},
    {value:"Express", label:"Express"},
    {value:"MongoDB", label:"MongoDB"},
    {value:"SQL", label:"SQL"},
    {value:"PostgreSQL", label:"PostgreSQL"},
    {value:"TypeScript", label:"TypeScript"},
    {value:"Redux", label:"Redux"},
    {value:"Angular", label:"Angular"},
    {value:"Vue", label:"Vue"},
    {value:"PHP", label:"PHP"},
    {value:"Laravel", label:"Laravel"},
    {value:"Ruby", label:"Ruby"},





  ]

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5"
        encType="multipart/form-data"
        >
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="$120k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select className="create-job-input" {...register("salaryType")}>
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>




          <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex: 2024-11-09"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select className="create-job-input" {...register("experienceLevel")}>
                <option value="">Choose your experience</option>
                <option value="NoExperience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="work remotely">work remotely</option>
              </select>
            </div>
          
          </div>




          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <Creatable
            className="create-job-input py-4"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            isMulti
             />
          </div>



          <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="file"
                placeholder="Paste your company logo URL: https://logo.png"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select className="create-job-input" {...register("employmentType")}>
                <option value="">Choose your experience</option>
                <option value="Full-time">Full Time</option>
                <option value="Part-time">Part Time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          
          </div>


          <div className="w-full ">
          <label className="block mb-2 text-lg">Job Description</label>
          <textarea
            className="create-job-input"
            rows={6}
            placeholder="Write your job description"
            {...register("description")}
          ></textarea>

          </div>


          <div>
          <label className="block mb-2 text-lg">Job Posted By</label>
          <input
            type="email"
            placeholder="your email"
            {...register("postedBy")}
            className="create-job-input"
          />

          </div>


          <input type="submit" className="my-5 block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer" />
        </form>
      </div>
    </div>
  );
};

export default PostJob;
