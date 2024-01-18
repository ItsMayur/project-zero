"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="z-1 fixed w-screen bottom-0 bg-themeColor1">
      <ul className="flex items-center justify-evenly py-5">
        <li>
          <Link href="">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_7_146)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.29289 0.292893C9.68342 -0.097631 10.3166 -0.097631 10.7071 0.292893L19.7071 9.29289C20.0976 9.68342 20.0976 10.3166 19.7071 10.7071C19.3166 11.0976 18.6834 11.0976 18.2929 10.7071L18 10.4142V17C18 18.6569 16.6569 20 15 20H5C3.34315 20 2 18.6569 2 17V10.4142L1.70711 10.7071C1.31658 11.0976 0.683417 11.0976 0.292893 10.7071C-0.097631 10.3166 -0.097631 9.68342 0.292893 9.29289L2.29254 7.29325L2.29325 7.29254L9.29289 0.292893ZM4 8.41421V17C4 17.5523 4.44772 18 5 18H15C15.5523 18 16 17.5523 16 17V8.41421L10 2.41421L4 8.41421Z"
                  className="fill-text1"
                />
              </g>
              <defs>
                <clipPath id="clip0_7_146">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </li>
        <li>
          <Link href="">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_7_140)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.10002 4C5.56329 1.71776 7.58104 0 10 0C12.419 0 14.4367 1.71776 14.9 4H15C17.7614 4 20 6.23858 20 9V15C20 17.7614 17.7614 20 15 20H5C2.23858 20 0 17.7614 0 15V9C0 6.23858 2.23858 4 5 4H5.10002ZM5 6C3.34315 6 2 7.34315 2 9V15C2 16.6569 3.34315 18 5 18H15C16.6569 18 18 16.6569 18 15V9C18 7.34315 16.6569 6 15 6H5ZM12.8293 4H7.17071C7.58254 2.83481 8.69378 2 10 2C11.3062 2 12.4175 2.83481 12.8293 4Z"
                  className="fill-text1"
                />
              </g>
              <defs>
                <clipPath id="clip0_7_140">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </li>
        <li>
          <Link href="">
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_7_144)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C8.55228 0 9 0.447715 9 1V2.08296C11.8377 2.55904 14 5.027 14 8V14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H11C11 17.6569 9.65685 19 8 19C6.34315 19 5 17.6569 5 16H1C0.447715 16 0 15.5523 0 15C0 14.4477 0.447715 14 1 14H2V8C2 5.027 4.16229 2.55904 7 2.08296V1C7 0.447715 7.44772 0 8 0ZM4 14H12V8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8V14ZM7 16C7 16.5523 7.44772 17 8 17C8.55228 17 9 16.5523 9 16H7Z"
                  className="fill-text1"
                />
              </g>
              <defs>
                <clipPath id="clip0_7_144">
                  <rect width="16" height="19" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </li>
        <li>
          <Link href="/profile/info">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_7_142)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 2.2C6.13989 2.2 2.2 6.13989 2.2 11C2.2 13.309 3.08887 15.4109 4.54519 16.9815C4.60018 16.7996 4.6733 16.6209 4.76869 16.4504C5.09209 15.8721 5.50005 15.3375 5.9841 14.8647C6.46988 14.3902 7.01794 13.9921 7.60908 13.6775C6.70876 12.8157 6.14588 11.6112 6.14588 10.2667C6.14588 7.60981 8.34373 5.5 11 5.5C13.6563 5.5 15.8541 7.60981 15.8541 10.2667C15.8541 11.6112 15.2912 12.8157 14.3909 13.6775C14.9821 13.9921 15.5301 14.3902 16.0159 14.8647C16.5 15.3375 16.9079 15.8721 17.2313 16.4504C17.3267 16.6209 17.3998 16.7996 17.4548 16.9815C18.9111 15.4109 19.8 13.309 19.8 11C19.8 6.13989 15.8601 2.2 11 2.2ZM15.3352 18.66C15.3779 18.4403 15.3993 18.2341 15.4 18.0513C15.401 17.7494 15.3457 17.586 15.3112 17.5243C15.0906 17.1298 14.8115 16.7636 14.4787 16.4386C13.5604 15.5417 12.3096 15.0333 11 15.0333C9.69043 15.0333 8.43957 15.5417 7.52129 16.4386C7.1885 16.7636 6.90939 17.1298 6.68877 17.5243C6.65427 17.586 6.59896 17.7494 6.60002 18.0513C6.60066 18.2341 6.62206 18.4403 6.66477 18.66C7.94366 19.3856 9.42204 19.8 11 19.8C12.578 19.8 14.0563 19.3856 15.3352 18.66ZM11 12.8333C12.4904 12.8333 13.6541 11.6599 13.6541 10.2667C13.6541 8.87344 12.4904 7.7 11 7.7C9.50958 7.7 8.34588 8.87344 8.34588 10.2667C8.34588 11.6599 9.50958 12.8333 11 12.8333ZM0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 14.913 19.9561 18.3478 16.8828 20.2963C15.1808 21.3754 13.1617 22 11 22C8.83834 22 6.81921 21.3754 5.11722 20.2963C2.04395 18.3478 0 14.913 0 11Z"
                  className="fill-text1"
                />
              </g>
              <defs>
                <clipPath id="clip0_7_142">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;