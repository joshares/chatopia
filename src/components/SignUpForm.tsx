"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import { registerSchema } from "../schema";
import FormErrors from "./FormErrors";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Congratulations from "./SuccessPromt";

export interface InputErros {
  [key: string]: string;
}
type initialValuesTypes = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function SignUpForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
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

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => {
      setSubmitError("");
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        formData,
        { withCredentials: true }
      );
      return data as any;
    },
    onError: (err: any) => {
      let error = "";
      if (err.response.data.length > 1) {
        error = err.response.data;
      } else if (err.response.statusText.length > 1) {
        error = err.response.statusText;
      } else {
        error = "Error, try to reload page";
      }

      setSubmitError(error);
    },
    onSuccess: (data) => {
      localStorage.setItem("User", JSON.stringify(data));
      setIsOpen(true);
      setSubmitError("");
    },
  });

  const onSubmit = () => {
    submit();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      username: formData.username,
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  function closeModal() {
    setIsOpen(false);
    router.push("/login");
  }

  return (
    <form className="grid gap-3 w-full relative" onSubmit={handleSubmit}>
      {isOpen && <Congratulations isOpen={isOpen} closeModal={closeModal} />}
      <div className=" relative border border-transparent border-b-gray-500">
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            handleChange(e);
          }}
          onBlur={handleBlur}
          className={`${
            errors.username && touched.username
              ? "w-full py-1.5 pl-3 placeholder:font-thin outline-none border border-red-800"
              : "w-full py-1.5 pl-3 placeholder:font-thin outline-none"
          }`}
          placeholder="Username"
        />
        {errors.username && touched.username && (
          <FormErrors error={errors.username} />
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
          className={`${
            isPending && "animate-pulse opacity-50"
          } py-2  text-lg font-medium bg-primary text-white rounded-md bg-secondary w-full `}
        >
          sign
        </button>
      </div>
    </form>
  );
}
