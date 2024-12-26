import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const apiURL = import.meta.env.VITE_API_URL;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false); // Loading state

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`https://ecom-backend-0gg0.onrender.com/api/forget-password`, values);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Error sending message to your mail");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md shadow-md p-6 rounded-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4 text-pry">Forgot Password</h2>
        <p className="text-center text-pry mb-6">
          Enter your email to reset your password.
        </p>

        {/* Forgot Password Form */}
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-pry">
                  Email Address
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-2 border border-pry text-pry bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-pry focus:border-pry"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className={`p-2 rounded w-full bg-pry text-white flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pry/90"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Reset Link"
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

export default ForgotPasswordPage;
