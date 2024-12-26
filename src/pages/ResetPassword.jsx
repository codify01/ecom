import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_URL || "https://ecom-backend-0gg0.onrender.com";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false); // Loading state

  // Validation schema
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = async (values) => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post(`${apiURL}/api/reset-password/${token}`, values);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error resetting your password");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3">
      <div className="card w-full max-w-md shadow-md  p-6 rounded-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-pry">Reset Password</h2>
        <p className="text-center text-pry mb-6">
          Enter your new password below to reset your account password.
        </p>

        {/* Reset Password Form */}
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-pry">
                  New Password
                </label>
                <Field
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full mt-1 px-4 py-2 border border-pry text-pry bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pry focus:border-pry"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-pry">
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full mt-1 px-4 py-2 border border-pry text-pry bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pry focus:border-pry"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                disabled={loading} // Disable when loading
                className={`p-2 rounded w-full bg-pry text-sec flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pry/90"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Resetting...</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Back to Login */}
        <p className="text-sm text-center mt-6 text-pry">
          Remembered your password?{" "}
          <Link to="/login" className="text-pry hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
