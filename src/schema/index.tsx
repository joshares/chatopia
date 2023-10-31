import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("please enter a valid email").required("Required"),
  password: yup.string().min(6).required("required"),
});
export const registerSchema = yup.object().shape({
  email: yup.string().email("please enter a valid email").required("Required"),
  fullName: yup.string().min(2).required("required"),
  password: yup
    .string()
    .min(6, "password must be atleast 6 characters")
    .required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});
export const paymentSchema = yup.object().shape({
  email: yup.string().email("please enter a valid email").required("Required"),
});
