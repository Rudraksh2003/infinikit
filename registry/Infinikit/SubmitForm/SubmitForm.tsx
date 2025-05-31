import { ChangeEvent, useState } from "react";

interface SubmitFormProps {
  userID: string;
  onSubmitSuccess?: (data: any) => void;
  onSubmitError?: (error: any) => void;
  apiEndpoint?: string;
  className?: string;
  darkMode?: boolean;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const CreativeSubmitForm = ({
  userID,
  onSubmitSuccess,
  onSubmitError,
  apiEndpoint = "http://localhost:5000/submit",
  className = "",
  darkMode = false
}: SubmitFormProps) => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [focused, setFocused] = useState<string>("");

  // Determine color scheme based on darkMode prop
  const baseColors = darkMode ? {
    bg: "bg-gray-900",
    cardBg: "bg-gray-800",
    input: "bg-gray-700",
    text: "text-white",
    border: "border-gray-600",
    focusBorder: "border-purple-500",
    muted: "text-gray-300"
  } : {
    bg: "bg-gray-100",
    cardBg: "bg-white",
    input: "bg-gray-50",
    text: "text-gray-900",
    border: "border-gray-300",
    focusBorder: "border-purple-500",
    muted: "text-gray-600"
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitMessage("");
  };

  const handleFocus = (field: string) => {
    setFocused(field);
  };

  const handleBlur = () => {
    setFocused("");
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.name) {
      setSubmitMessage("Please enter your name");
      return;
    }
    if (currentStep === 2 && !formData.email) {
      setSubmitMessage("Please enter your email");
      return;
    }
    setSubmitMessage("");
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setSubmitMessage("");
  };

  const submitForm = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage("Please fill all fields before submitting");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, ...formData }),
      });

      const data = await response.json();
      if (data.message) {
        setSubmitMessage("✨ Form submitted successfully! ✨");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setCurrentStep(1);
        }, 2000);
        
        if (onSubmitSuccess) {
          onSubmitSuccess(data);
        }
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
        if (onSubmitError) {
          onSubmitError(data);
        }
      }
    } catch (error) {
      setSubmitMessage("Connection error. Please check your network.");
      if (onSubmitError) {
        onSubmitError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressWidth = () => {
    return `${(currentStep / 3) * 100}%`;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold mb-6 text-center ${baseColors.text}`}>
              What's your name?
            </h2>
            <div 
              className={`relative transform transition-all duration-300 ${
                focused === "name" ? "scale-105" : ""
              }`}
            >
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                className={`w-full p-4 rounded-lg ${baseColors.input} border-2 
                  ${focused === "name" ? baseColors.focusBorder : baseColors.border} 
                  ${baseColors.text} text-lg shadow-md outline-none transition-all`}
              />
              <div className={`absolute -bottom-1 left-0 w-full h-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"} rounded-full overflow-hidden`}>
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" 
                  style={{ width: formData.name ? "100%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold mb-6 text-center ${baseColors.text}`}>
              What's your email?
            </h2>
            <div 
              className={`relative transform transition-all duration-300 ${
                focused === "email" ? "scale-105" : ""
              }`}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className={`w-full p-4 rounded-lg ${baseColors.input} border-2 
                  ${focused === "email" ? baseColors.focusBorder : baseColors.border} 
                  ${baseColors.text} text-lg shadow-md outline-none transition-all`}
              />
              <div className={`absolute -bottom-1 left-0 w-full h-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"} rounded-full overflow-hidden`}>
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" 
                  style={{ width: formData.email ? "100%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className={`text-2xl font-bold mb-6 text-center ${baseColors.text}`}>
              Your message
            </h2>
            <div 
              className={`relative transform transition-all duration-300 ${
                focused === "message" ? "scale-105" : ""
              }`}
            >
              <textarea
                name="message"
                placeholder="What would you like to tell us?"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                rows={5}
                className={`w-full p-4 rounded-lg ${baseColors.input} border-2 
                  ${focused === "message" ? baseColors.focusBorder : baseColors.border} 
                  ${baseColors.text} text-lg shadow-md outline-none transition-all resize-none`}
              />
              <div className={`absolute -bottom-1 left-0 w-full h-1 ${darkMode ? "bg-gray-600" : "bg-gray-300"} rounded-full overflow-hidden`}>
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300" 
                  style={{ width: formData.message ? "100%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${className} rounded-2xl ${baseColors.cardBg} p-6 shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full opacity-10"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500 rounded-full opacity-10"></div>
      
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500`}>
            {currentStep === 3 ? "Final Step" : `Step ${currentStep} of 3`}
          </div>
          <div className="animate-ping absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-400"></div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className={`w-full h-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full mb-6 overflow-hidden`}>
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-in-out"
          style={{ width: getProgressWidth() }}
        ></div>
      </div>
      
      {/* Form content */}
      <div className="min-h-64">
        {renderStepContent()}
      </div>
      
      {/* Error message */}
      {submitMessage && (
        <div className={`mt-4 text-center py-2 px-4 rounded-lg text-sm font-medium ${
          submitMessage.includes("✨") 
            ? `${darkMode ? "bg-green-900/30 text-green-300 border border-green-500/50" : "bg-green-100 text-green-800 border border-green-200"}`
            : `${darkMode ? "bg-red-900/30 text-red-300 border border-red-500/50" : "bg-red-100 text-red-800 border border-red-200"}`
        }`}>
          {submitMessage}
        </div>
      )}
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 ? (
          <button
            onClick={prevStep}
            className={`px-5 py-2 rounded-lg ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-all ${baseColors.text} font-medium flex items-center`}
          >
            <span className="mr-2">←</span> Back
          </button>
        ) : (
          <div></div>
        )}
        
        {currentStep < 3 ? (
          <button
            onClick={nextStep}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white font-medium flex items-center"
          >
            Next <span className="ml-2">→</span>
          </button>
        ) : (
          <button
            onClick={submitForm}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all text-white font-medium flex items-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreativeSubmitForm;


/*
// Example of how to use the CreativeSubmitForm component in your main.js or App.js

import React from 'react';
import CreativeSubmitForm from './CreativeSubmitForm';

// Example App component
function App() {
  // Handler for successful form submission
  const handleFormSuccess = (data) => {
    console.log("Form submitted successfully:", data);
    // You can perform additional actions here
  };

  // Handler for form submission errors
  const handleFormError = (error) => {
    console.error("Form submission error:", error);
    // You can handle errors here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">My Application</h1>
      
      
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Light Mode Form</h2>
        <CreativeSubmitForm 
          userID="user123"
          darkMode={false}
          onSubmitSuccess={handleFormSuccess}
          onSubmitError={handleFormError}
          className="max-w-md mx-auto"
          apiEndpoint="https://your-api-endpoint.com/submit"
        />
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-white">Dark Mode Form</h2>
        <CreativeSubmitForm 
          userID="user456"
          darkMode={true}
          onSubmitSuccess={handleFormSuccess}
          onSubmitError={handleFormError}
          className="max-w-md mx-auto"
        />
      </div>
    </div>
  );
}

export default App;*/