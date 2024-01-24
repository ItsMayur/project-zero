"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const router = useRouter();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.current == "") return;

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current,
          password: password.current,
        }),
      };
      const response = await fetch("/lib/api/login", options);
      response.json().then((res) => {
        document.cookie = `token=${res.token}; Path=/;`;
      });

      if (response.status !== 200) throw new Error("Can't login");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-themeColor1 space-y-10">
      <div>
        <h1 className="text-text1 text-[40px] italic  text-themeColor3">
          PROJECT-ZERO
        </h1>
      </div>{" "}
      <form onSubmit={login} className="flex flex-col items-center">
        <div className="space-y-5">
          <div className="flex space-x-2 text-[18px] border-b-[1px] border-text1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.17318 2.76121C10.207 1.91879 12.4619 1.771 14.5882 2.34075C16.7145 2.91049 18.5935 4.16595 19.9335 5.91239C21.2736 7.65883 22 9.79866 22 12V13.5C22 15.433 20.433 17 18.5 17C17.2958 17 16.2336 16.3918 15.6039 15.4659C14.6942 16.4116 13.4158 17 12 17C9.23859 17 7.00001 14.7614 7.00001 12C7.00001 9.23858 9.23859 7 12 7C13.1256 7 14.1644 7.37195 15 7.99964C15.0002 7.44752 15.4478 7 16 7C16.5523 7 17 7.44772 17 8V13.5C17 14.3284 17.6716 15 18.5 15C19.3284 15 20 14.3284 20 13.5V12C20 10.2389 19.4189 8.52707 18.3468 7.12991C17.2748 5.73276 15.7716 4.7284 14.0706 4.2726C12.3695 3.8168 10.5656 3.93503 8.93855 4.60897C7.31153 5.2829 5.95235 6.47487 5.07181 8C4.19127 9.52514 3.83859 11.2982 4.06846 13.0442C4.29832 14.7902 5.09789 16.4116 6.34316 17.6569C7.58843 18.9021 9.2098 19.7017 10.9558 19.9316C12.7018 20.1614 14.4749 19.8087 16 18.9282C16.4783 18.6521 17.0899 18.8159 17.366 19.2942C17.6422 19.7725 17.4783 20.3841 17 20.6603C15.0936 21.7609 12.8773 22.2018 10.6948 21.9145C8.51224 21.6271 6.48553 20.6277 4.92895 19.0711C3.37236 17.5145 2.3729 15.4878 2.08557 13.3053C1.79823 11.1228 2.23909 8.90642 3.33976 7C4.44043 5.09359 6.13941 3.60363 8.17318 2.76121ZM15 12C15 10.3431 13.6569 9 12 9C10.3432 9 9.00001 10.3431 9.00001 12C9.00001 13.6569 10.3432 15 12 15C13.6569 15 15 13.6569 15 12Z"
                className="fill-text1"
              />
            </svg>

            <input
              className="placeholder:text-text1 bg-themeColor2 text-text1"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => (email.current = e.target.value)}
            />
          </div>
          <div className="flex space-x-2 text-[18px] border-b-[1px] border-text1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V8.41637C18.7655 9.18783 20 10.9488 20 13V17C20 19.7614 17.7614 22 15 22H9C6.23858 22 4 19.7614 4 17V13C4 10.9488 5.23448 9.18783 7 8.41637V7ZM9 8H15V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V8ZM9 10C8.73949 10 8.48813 10.033 8.24926 10.0945C6.95512 10.4275 6 11.6035 6 13V17C6 18.6569 7.34315 20 9 20H15C16.6569 20 18 18.6569 18 17V13C18 11.6035 17.0449 10.4275 15.7507 10.0945C15.5119 10.033 15.2605 10 15 10H9ZM12 13C12.5523 13 13 13.4477 13 14V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V14C11 13.4477 11.4477 13 12 13Z"
                className="fill-text1"
              />
            </svg>

            <input
              className="placeholder:text-text1 bg-themeColor2 text-text1"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => (password.current = e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-themeColor3 w-[220px] h-[38px] mt-[40px] mb-[10px]"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <p className="text-text1">Don't have an account</p>
          <Link href="/profile/signup" className="text-[14px] text-themeColor3">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
