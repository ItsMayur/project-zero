import { db } from "@/app/lib/utils/db";
import { JsonValue } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let products: JsonValue[];
  const body = await req.json();
  const search: string[] = body.search.split(" ");
  const categories: string[] = body.categories;
  //   if (categories.length != 0) {
  //     search.map(async (searchTitles, idx) => {
  //       let productsResult = await db.product
  //         .findMany({
  //           where: {
  //             title: {
  //               contains: searchTitles.toLowerCase(),
  //               mode: "insensitive",
  //             },
  //             categories: {
  //               contains: categories,
  //             },
  //           },
  //         })
  //         .then((Products) => {
  //           console.log(Products);
  //         });
  //     });
  //   }
  if (categories.length == 0) {
    search.map(async (searchTitles, idx) => {
      let productsResult = await db.product.findMany({
        where: {
          title: {
            contains: searchTitles.toLowerCase(),
            mode: "insensitive",
          },
          //   discription: {
          //     contains: searchTitles.toLowerCase(),
          //   },
        },
      });
    });
    // search.map(async (searchTitles, idx) => {
    //   let productsResult = await db.product.findMany({
    //     where: {
    //       title: {
    //         contains: searchTitles.toLowerCase(),
    //         mode: "insensitive",
    //       },
    //     },
    //   });
    //   console.log(productsResult);
    // });
    // search.map(async (searchTitles, idx) => {
    //   let productsResult = await db.product.findMany({
    //     where: {
    //       discription: {
    //         contains: searchTitles.toLowerCase(),
    //         mode: "insensitive",
    //       },
    //     },
    //   });
    //   console.log(productsResult);
    // });
  }

  return NextResponse.json({ message: "a" });
}
