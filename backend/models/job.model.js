
import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },
  salaryType: {
    type: String,
    enum: ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly'],
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  postingDate: {
    type: Date,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy:{
    type:String,
    required:true
  }
});

const Job = mongoose.model('Job', jobSchema);

export default Job