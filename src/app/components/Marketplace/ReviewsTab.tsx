"use client";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, ReactPropTypes, useEffect, useState } from "react";

const ReviewsTab = () => {
  const searchParams = useSearchParams();

  const [Reviews, setReviews] = useState([]);
  //   REVIEW FETCHING FUNCTION
  const getReviews = async (product_id: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
        }),
      };
      const response = await fetch("/lib/api/marketplace/get_review", options);
      const data = await response.json();
      const reviews = data.Reviews;
      console.log(reviews);
      if (reviews) {
        setReviews(reviews);
        console.log(Reviews);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const product_id = searchParams.get("product_id");
    if (product_id) {
      getReviews(product_id);
    }
  }, []);
  return <div></div>;
};

export default ReviewsTab;
