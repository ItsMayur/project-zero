"use client";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, ReactPropTypes, useEffect, useState } from "react";

const ReviewsTab = (props: any) => {
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
  const SetArtisticMeter = async (Rating: any) => {
    const TotalRating = Math.round((Rating.total / 5) * 100);
    const TotalQuality = Math.round((Rating.quality / 5) * 100);
    const TotalValue = Math.round((Rating.value / 5) * 100);
    const TotalService = Math.round((Rating.service / 5) * 100);
    const TotalPackaging = Math.round((Rating.packaging / 5) * 100);

    let Total = document.getElementById("Total");
    let Packaging = document.getElementById("Packaging");
    let Service = document.getElementById("Service");
    let Value = document.getElementById("Value");
    let Quality = document.getElementById("Quality");
    if (Total != null) {
      Total.style.width = `${TotalRating}%`;
    }
    if (Packaging != null) {
      Packaging.style.width = `${TotalPackaging}%`;
    }
    if (Service != null) {
      Service.style.width = `${TotalService}%`;
    }
    if (Value != null) {
      Value.style.width = `${TotalValue}%`;
    }
    if (Quality != null) {
      Quality.style.width = `${TotalQuality}%`;
    }
  };

  useEffect(() => {
    const product_id = searchParams.get("product_id");
    if (product_id) {
      getReviews(product_id);
    }
  }, []);
  useEffect(() => {
    SetArtisticMeter(props.Rating);
  });
  return (
    <div>
      <div>
        <div className="text-center">Artist Meter</div>
        <ul className="flex flex-col justify-center">
          <li>
            <div>Total</div>
            <div
              id="Total"
              className="bg-themeColor3 h-2 rounded-r  w-0 "
            ></div>
          </li>
          <li>
            <div>Quality</div>
            <div
              id="Quality"
              className="bg-themeColor3 h-2 rounded-r w-0"
            ></div>
          </li>
          <li>
            <div>Value</div>
            <div id="Value" className="bg-themeColor3 h-2 rounded-r w-0"></div>
          </li>
          <li>
            <div>Service</div>
            <div
              id="Service"
              className="bg-themeColor3 h-2 rounded-r w-0"
            ></div>
          </li>
          <li>
            <div>Packaging</div>
            <div
              id="Packaging"
              className="bg-themeColor3 h-2 rounded-r w-0"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewsTab;
