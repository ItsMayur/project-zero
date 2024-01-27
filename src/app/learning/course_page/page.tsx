"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface course {
  title?: string;
  discription?: string;
  price?: number;
  level?: string;
  categories?: object;
  isPaid?: boolean;
  lessons?: object;
}
const page = () => {
  const getSearchParam = useSearchParams();
  let [course, setCourse] = useState<course>({});

  // GET CURRENT DATE
  const Today = () => {
    const Months: string[] = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = Number(String(today.getMonth()).padStart(2, "0"));
    return `${Months[mm]} ${dd} `;
  };
  //   PRODUCT DATA FETCH FUNCTION
  const getCourseData = async (course_id: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: course_id,
        }),
      };
      const response = await fetch("/lib/api/learning/get_course", options);
      const data = await response.json();
      const course = data.Course;
      setCourse(course);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const course_id = getSearchParam.get("course_id");
    if (course_id) {
      getCourseData(course_id);
    }
  }, [getSearchParam]);

  return (
    <div className="bg-themeColor1 px-4 pt-6 pb-20 text-text1">
      <div className="">
        <h3 className="text-3xl">{course.title}</h3>
        <p className="text-sm">This course is part of Project Zero</p>
        <p className="text-sm">Taught in English</p>
        <div className="text-xl flex justify-center">
          <p className=" my-2  p-2 border-text1 border-[1px] rounded">
            Instructure: Project Zero
          </p>
        </div>
        <div className=" flex text-sm  rounded justify-center">
          <div className="flex flex-col items-center bg-themeColor3 rounded">
            <div className="mx-16 my-1 text-center">
              <p>Enroll for course</p>
              <p>Starts {Today()} </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-10">
        <div className="space-y-1 text-xl">
          <div className="flex space-x-2 items-center">
            <h2>4.8⭐</h2>
            <p className="text-sm ">(12000 Reviews)</p>
          </div>
          <h2>{course.level}</h2>
          <h2>22 hours</h2>
          <h2 className="text-themeColor3">{course.price}</h2>
        </div>
      </div>
      <div>
        <div className="space-y-2">
          <h4 className="text-3xl">About the Course :</h4>
          <p> {course.discription}</p>
        </div>
      </div>
      <div className=" flex text-sm  rounded justify-center postion-relative my-8">
        <div className="flex flex-col items-center bg-themeColor3 rounded">
          <div className="mx-16 my-1 text-center">
            <p>Enroll for course</p>
            <p>Starts {Today()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
