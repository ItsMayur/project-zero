"use client";

import React, {
  ReactComponentElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface userInfo {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  profile_pic: string;
  role: string;
  message: string;
}

const page = () => {
  const getProfileInfo = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      };
      const response = await fetch("/lib/api/profile/user_data", options);
      response.json().then((res) => {
        if (res.username === undefined) {
          console.log(res);
        } else {
          console.log(res);
        }
      });

      if (response.status !== 200) throw new Error("Can't login");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfileInfo();
  }, []);

  return <div></div>;
};

export default page;
