"use client";
import React from "react";

const page = () => {
  const search = () => {};

  return (
    <div>
      <form onSubmit={search} className="flex items-center justify-center ">
        <div>
          <input
            type="text"
            name="marketplace_search_box"
            id="marketplace_search_box"
            className="rounded py-1 my-2 bg-text2 text-[16px] text-text1 text-center"
          />
        </div>
        <div>
          <input type="submit" value="" />
        </div>
      </form>
    </div>
  );
};

export default page;
