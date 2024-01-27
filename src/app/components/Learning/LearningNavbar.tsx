"use client";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState } from "react";

const page = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const search_product = async (event: Event) => {
    event?.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: search,
          categories: [""],
          page: 1,
          course_count: 10,
        }),
      };
      const response = await fetch("/lib/api/learning/search_course", options);

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };
  const SendToCart = () => {
    router.push("/learning/cart");
  };

  return (
    <div>
      <form
        onSubmit={search_product}
        className="flex items-center justify-between px-6 "
      >
        <div>
          <input
            type="text"
            name="marketplace_search_box"
            id="marketplace_search_box"
            placeholder="🔍Search your art supply"
            className="rounded py-1 my-2 bg-text2 text-[16px] text-text1 px-2"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="text-text1" onClick={SendToCart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />{" "}
          </svg>
        </div>
      </form>
    </div>
  );
};

export default page;
