import React from "react";
import MarketNavbar from "@/app/components/Marketplace/MarketNavbar";
import ProductMini from "../components/Marketplace/ProductMini";

const page = () => {
  return (
    <div className="bg-themeColor2">
      <MarketNavbar />
      <div className="space-y-4 ">
        <ProductMini />
        <ProductMini />
        <ProductMini />
        <ProductMini />
      </div>
    </div>
  );
};

export default page;
