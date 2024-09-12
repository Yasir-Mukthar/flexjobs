import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    //email and password not empty
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        //if signup go to next pafe

        console.log(res);
        if (!res.ok) {
          throw new Error("Signup failed");
        }
        navigate("/")

        res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
alert(err)      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center  ">
      <div
        className="flex w-[90%]  flex-col items-center rounded-xl border py-8 sm:w-2/5 sm:px-6
    shadow-2xl bg-[#fafafa]
    "
      >
        <p className="m-2 text-xl">Sign Up</p>
        <p className="my-3 h-[1px] w-[80%] bg-black"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={handleSubmit}
        >
          <label className="my-1 text-lg">Email Address</label>
          <input
            type="email"
            placeholder="Your Email"
            className=" w-full pl-5 py-3 rounded   placeholder-body-text-color outline-none mb-3 border border-border-info-color focus:border-theme-color bg-white"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label className="my-1 mt-2 text-lg">Password</label>
          <div className=" pr-3 overflow-hidden flex justify-between items-center w-full rounded outline-none mb-4 border border-border-info-color">
            <input
              type="password"
              placeholder="Your Password "
              className=" w-full pl-5 py-3   placeholder-body-text-color outline-none "
              name="password"
              value={formData.password}
              minLength={5}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-blue px-4 py-3 font-bold hover:bg-color-danger  text-[#ffffff]"
          >
            Sign Up
          </button>
        </form>

        <p>
          Dont have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-blue hover:text-color-danger"
          >
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
