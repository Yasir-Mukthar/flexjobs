import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/job.model.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/user.model.js";

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

const ConnectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log("Database connection failed");
  }
};
ConnectDb();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    console.log("storage.......");

    cb(null, Date.now() + "-" + file.originalname); // Specify the file name
  },
});

const upload = multer({ storage: storage });

// get a single job

app.get("/all-job/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const singleJob = await Job.findOne({ _id: id });
    res.json(singleJob);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching job",
    });
  }
});


// register user

app.post("/login", async(req, res)=>{
  const {  email, password } = req.body;
try {
  const user = await User.findOne({
    email
  });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  if (user.password !== password) {
    return res.status(400).json({
      message: "Incorrect password",
    });
  }
  res.status(200).json(user);
} catch (error) {
  res.status(500).json({
    message: "Server error",
    error,
  });
  
}
})


//signup user

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user
      = await User.findOne({
        email,
      });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = new User({
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
});

//update job

app.patch("/update-job/:id", upload.single("companyLogo"), async (req, res) => {
  console.log("kdkkd");
  const id = req.params?.id;
  const jobData = req.body;
  console.log(jobData);
  jobData.companyLogo = req?.file?.path
  //findONeandupdate
  try {
    const updatedJob = await Job.findOneAndUpdate({ _id: id }, jobData, {
      new: true,
    });
    res.json(updatedJob);
    console.log(updatedJob);
  } catch (error) {
    res.status(500).json({
      message: "Error updating job",
    });
  }
});

app.post("/job/:id", async (req, res) => {
  console.log("delete");

  try {
    const id = req.params.id;
    console.log(id);

    const job = await Job.findByIdAndDelete(id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/jobs", upload.single("companyLogo"), async (req, res) => {
  try {
    console.log("before.....");

    const {
      jobTitle,
      companyName,
      jobLocation,
      salaryType,
      employmentType,
      experienceLevel,
      minPrice,
      maxPrice,
      postingDate,
      description,
      postedBy,
    } = req.body;
    const companyLogo = req.file.path; // Path to the uploaded file

    console.log(
      jobTitle,
      companyName,
      jobLocation,
      salaryType,
      employmentType,
      experienceLevel,
      companyLogo,
      minPrice,
      maxPrice,
      postingDate,
      description,
      postedBy
    );

    // Validate required fields
    if (
      !jobTitle ||
      !description ||
      !companyName ||
      !jobLocation ||
      !salaryType ||
      !employmentType ||
      !experienceLevel ||
      !companyLogo ||
      !minPrice ||
      !maxPrice ||
      !postingDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new job instance
    const newJob = new Job({
      jobTitle,
      companyName,
      jobLocation,
      salaryType,
      employmentType,
      experienceLevel,
      companyLogo,
      minPrice,
      maxPrice,
      postingDate,
      description,
      postedBy,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    // Send a success response
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//get all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

//get jobs by email
app.get("/jobs/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const jobs = await Job.find({ postedBy: email }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
