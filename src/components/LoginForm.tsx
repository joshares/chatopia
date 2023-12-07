import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import { loginSchema } from "../schema";
import FormErrors from "./FormErrors";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/store";
import axios from "axios";

type initialValuesTypes = {
  email: string;
  password: string;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const addUser = useStore((store) => store.addUser);
  const [submitError, setSubmitError] = useState("");

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const { mutate: login, isPending } = useMutation({
    mutationFn: async () => {
      setSubmitError("");
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        formData,
        { withCredentials: true }
      );
      return data as any;
    },
    onError: (err: any) => {
      let error = "";
      if (err.response.statusText.length > 1) {
        error = err.response.statusText;
      } else if (err.response.data.length > 1) {
        error = err.response.data;
      } else {
        error = "Error, try to reload page";
      }

      setSubmitError(error);
      console.log(err, submitError);
    },
    onSuccess: (data) => {
      router.push("/");
      setSubmitError("");
      console.log(data?.data);
    },
  });

  const onSubmit = () => {
    login();
  };
  const onSubmitDemo = () => {
    setFormData({ email: "demo@gmail.com", password: "1234567" });
    // console.log(formData);
    login();
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
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form className="grid gap-3 w-full" onSubmit={handleSubmit}>
      <div className="border border-transparent relative border-b-gray-500">
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
      <div className="border border-transparent border-b-gray-500 relative ">
        <input
          type={`${showPassword ? "text" : "password"}`}
          name="password"
          value={values.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            handleChange(e);
          }}
          onBlur={handleBlur}
          className={`${
            errors.password && touched.password
              ? "w-full py-1.5 pl-3 placeholder:font-thin outline-none border border-red-800 "
              : "w-full py-1.5 pl-3 placeholder:font-thin outline-none border-none"
          }`}
          placeholder="Password"
        />
        <div
          className="absolute top-3 right-2 text-black cursor-pointer w-max"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <BiHide /> : <BiShow />}
        </div>
        {errors.password && touched.password && (
          <FormErrors error={errors.password} />
        )}
      </div>
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1">
          <input type="checkbox" />
          <label className="text-black">Remember me</label>
        </div>
        <p className="text-black">Forgot Password?</p>
      </div>

      <div className="w-full mx-auto my-8">
        <button
          type="submit"
          className="py-2  text-lg font-medium bg-primary text-white rounded-md bg-secondary w-full"
        >
          {isPending ? "loading..." : "Login"}
        </button>

        {submitError && (
          <p className="text-rose-500 text-sm font-medium mx-auto text-center">
            {submitError}
          </p>
        )}
      </div>
      <div className="w-full mx-auto my-8">
        <button
          onClick={onSubmitDemo}
          // type="submit"
          className="py-2  text-lg font-medium  text-primary rounded-md bg-secondary w-full"
        >
          {isPending ? "loading..." : "Login as Demo user"}
        </button>

        {submitError && (
          <p className="text-rose-500 text-sm font-medium mx-auto text-center">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
