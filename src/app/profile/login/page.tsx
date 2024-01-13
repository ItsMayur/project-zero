"use client";
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
        document.cookie = `token=${res.token}`;
      });

      if (response.status !== 200) throw new Error("Can't login");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {" "}
      <form onSubmit={login}>
        <div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => (email.current = e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter you password master"
              onChange={(e) => (password.current = e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
