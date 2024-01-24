import React, { ComponentProps, FC, useEffect, useState } from "react";

const AddReview = (props: { product_id: number }) => {
  const [Value, setValue] = useState(0);
  const [Quality, setQuality] = useState(0);
  const [Service, setService] = useState(0);
  const [Packaging, setPackaging] = useState(0);
  const [Comment, setComment] = useState("");
  const isAllFeildsDone: boolean = false;

  const nextReview = () => {
    const ReviewBox = document.getElementById("ReviewBox");
    if (Packaging && Value && Quality && Service) {
      submitReview();
    } else {
      alert("Please enter all review feilds");
    }
  };

  const submitReview = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewable_id: props.product_id,
          rating: {
            quality: Quality,
            value: Value,
            service: Service,
            packaging: Packaging,
          },
          comment: Comment,
        }),
      };
      const response = await fetch("/lib/api/marketplace/add_review", options);
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    nextReview();
  }, []);
  return (
    <div>
      <ul className="flex overflow-scroll my-6" id="ReviewBox">
        <li className=" w-100%  mx-2">
          <div className="w-screen text-center px-8 space-y-4 ">
            <h3 className="text-bold">Value</h3>
            <div className="flex justify-evenly ">
              <div
                onClick={() => {
                  setValue(1);
                }}
              >
                1
              </div>
              <div
                onClick={() => {
                  setValue(2);
                }}
              >
                2
              </div>
              <div
                onClick={() => {
                  setValue(3);
                }}
              >
                3
              </div>
              <div
                onClick={() => {
                  setValue(4);
                }}
              >
                4
              </div>
              <div
                onClick={() => {
                  setValue(5);
                }}
              >
                5
              </div>
            </div>
          </div>
        </li>
        <li className=" w-100%   mx-2">
          <div className="w-screen text-center px-8 space-y-2">
            <h3 className="text-bold">Quality</h3>
            <div className="flex justify-evenly ">
              <div
                onClick={() => {
                  setQuality(1);
                }}
              >
                1
              </div>
              <div
                onClick={() => {
                  setQuality(2);
                }}
              >
                2
              </div>
              <div
                onClick={() => {
                  setQuality(3);
                }}
              >
                3
              </div>
              <div
                onClick={() => {
                  setQuality(4);
                }}
              >
                4
              </div>
              <div
                onClick={() => {
                  setQuality(5);
                }}
              >
                5
              </div>
            </div>
          </div>
        </li>
        <li className=" w-100% mx-2">
          <div className="w-screen text-center px-8 space-y-2">
            <h3 className="text-bold">Service</h3>
            <div className="flex justify-evenly ">
              <div
                onClick={() => {
                  setService(1);
                }}
              >
                1
              </div>
              <div
                onClick={() => {
                  setService(2);
                }}
              >
                2
              </div>
              <div
                onClick={() => {
                  setService(3);
                }}
              >
                3
              </div>
              <div
                onClick={() => {
                  setService(4);
                }}
              >
                4
              </div>
              <div
                onClick={() => {
                  setService(5);
                }}
              >
                5
              </div>
            </div>
          </div>
        </li>
        <li className=" w-100% mx-2">
          <div className="w-screen text-center px-8 space-y-2">
            <h3 className="text-bold">Packaging</h3>
            <div className="flex justify-evenly ">
              <div
                onClick={() => {
                  setPackaging(1);
                }}
              >
                1
              </div>
              <div
                onClick={() => {
                  setPackaging(2);
                }}
              >
                2
              </div>
              <div
                onClick={() => {
                  setPackaging(3);
                }}
              >
                3
              </div>
              <div
                onClick={() => {
                  setPackaging(4);
                }}
              >
                4
              </div>
              <div
                onClick={() => {
                  setPackaging(5);
                }}
              >
                5
              </div>
            </div>
          </div>
        </li>
        <li className=" w-100% mx-2 flex items-center justify-center">
          <div className="w-screen text-center px-8 space-y-2">
            <input
              type="text"
              className="text-text2"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
        </li>
      </ul>
      <div className="text-textColor3 text-center" onClick={nextReview}>
        {/* {1 ? "Next" : "Submit"} */}
        Submit
      </div>
    </div>
  );
};

export default AddReview;
