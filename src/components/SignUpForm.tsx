import React, { useState } from "react";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import { registerSchema } from "../schema";
import FormErrors from "./FormErrors";
// import { toast } from "react-toastify";

export interface InputErros {
  [key: string]: string;
}
type initialValuesTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

export default function SignUpForm() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitError, setSubmitError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  // const onSubmit = async (values: initialValuesTypes) => {
  //   console.log(values);
  //   router.push("/login");
  //   const options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   };

  //   await fetch("api/auth/signup", options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         setSubmitError(data.error);
  //       }
  //       if (data.success) {
  //         router.push("/login");
  //       }
  //     });
  // };

  const onSubmit = () => {
    console.log("hi");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const {
    values,
    handleBlur,
    isSubmitting,
    touched,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      fullName: data.username,
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <form className="grid gap-3 w-full" onSubmit={handleSubmit}>
      <div className=" relative border border-transparent border-b-gray-500">
        <input
          type="text"
          name="username"
          value={values.fullName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            handleChange(e);
          }}
          onBlur={handleBlur}
          className={`${
            errors.fullName && touched.fullName
              ? "w-full py-1.5 pl-3 placeholder:font-thin outline-none border border-red-800"
              : "w-full py-1.5 pl-3 placeholder:font-thin outline-none"
          }`}
          placeholder="Username"
        />
        {errors.fullName && touched.fullName && (
          <FormErrors error={errors.fullName} />
        )}
      </div>
      <div className=" relative border border-transparent border-b-gray-500">
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            handleChange(e);
          }}
          onBlur={handleBlur}
          className={`${
            errors.email && touched.email
              ? "w-full py-1.5 pl-3 placeholder:font-thin outline-none border border-red-800"
              : "w-full py-1.5 pl-3 placeholder:font-thin outline-none"
          }`}
          placeholder="Email"
        />
        {errors.email && touched.email && <FormErrors error={errors.email} />}
      </div>
      <div
        className="border border-transparent border-b-gray-500 relative"
        onClick={toggleShowPassword}
      >
        <input
          type={showPassword ? "password" : "text"}
          name="password"
          value={values.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            handleChange(e);
          }}
          onBlur={handleBlur}
          className={`${
            errors.password && touched.password
              ? "w-full py-1.5 pl-3 placeholder:font-thin outline-none border border-red-800"
              : "w-full py-1.5 pl-3 placeholder:font-thin outline-none"
          }`}
          placeholder="Password"
        />
        <div className="absolute top-3 right-2 text-gray-400 cursor-pointer">
          {showPassword ? <BiHide /> : <BiShow />}
        </div>
        {errors.password && touched.password && (
          <FormErrors error={errors.password} />
        )}
      </div>
      <div className="border border-transparent border-b-gray-500 relative">
        <input
          type={showPassword ? "password" : "text"}
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            handleChange(e);
          }}
          onBlur={handleBlur}
          className={`${
            errors.confirmPassword && touched.confirmPassword
              ? "w-full py-1.5 pl-3 placeholder:font-thin outline-none border border-red-800"
              : "w-full py-1.5 pl-3 placeholder:font-thin outline-none"
          }`}
          placeholder="Confirm Password"
        />
        <div
          className="absolute top-3 right-2 text-gray-400 cursor-pointer"
          onClick={toggleShowPassword}
        >
          {showPassword ? <BiHide /> : <BiShow />}
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <FormErrors error={errors.confirmPassword} />
        )}
      </div>
      {submitError.length > 2 && (
        <p className="text-red-500 text-center text-sm">
          {submitError}.check details or try to login if user exist
        </p>
      )}
      <div className="w-full mx-auto my-8">
        <button
          type="submit"
          className="py-2  text-lg font-medium bg-primary text-white rounded-md bg-secondary w-full"
        >
          sign up
        </button>

        <p className="text-center mt-5 my-2 uppercase font-bold text-2xl">or</p>
      </div>
    </form>
  );
}
