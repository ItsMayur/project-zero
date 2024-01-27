import React from "react";
import LearningNavbar from "@/app/components/Learning/LearningNavbar";
import CourseMini from "../components/Learning/CourseMini";

const page = () => {
  return (
    <div className="bg-themeColor2">
      <LearningNavbar />
      <div className="space-y-4 ">
        <CourseMini />
        <CourseMini />
        <CourseMini />
        <CourseMini />
      </div>
    </div>
  );
};

export default page;
