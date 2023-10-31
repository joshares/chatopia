import React, { useState } from "react";
import Link from "next/link";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { BiHide, BiShow } from "react-icons/bi";
import { useFormik } from "formik";
import { loginSchema } from "../schema";
import FormErrors from "./FormErrors";
// import { toast } from "react-toastify";

type initialValuesTypes = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [load, setload] = useState(false);

  const [password, setPassword] = useState("");
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // const onSubmit = async (values: initialValuesTypes) => {
  //   setload(true);
  //   try {
  //     // const loginRes = await signIn("credentials", {
  //       redirect: false,
  //       email: email,
  //       password: password,
  //     });
  //     if (loginRes && !loginRes.ok) {
  //       setSubmitError(loginRes.error || "");
  //     } else {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     setload(false);
  //     console.log(error);
  //   }
  // };

  const onSubmit = () => {
    console.log("yes");
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
      email: email,
      password: password,
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
            handleEmailChange(e);
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
            handlePasswordChange(e);
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
          {load ? "loading..." : "Login"}
        </button>
        {submitError && (
          <p className="text-rose-500 text-sm font-medium mx-auto text-center">
            {submitError}
          </p>
        )}
        <p className="text-center mt-5 my-2 uppercase font-bold text-2xl text-black">
          or
        </p>
      </div>
    </form>
  );
}
