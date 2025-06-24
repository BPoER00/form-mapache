"use client";
import Navbar from "@/components/UI/Navbar/Navbar";
import Volver from "@/components/UI/Volver";
import { NotificationProvider } from "@/contexts/Notify";
import React from "react";

const page = () => {
  return (
    <NotificationProvider>
      <Navbar />
      <Volver />

      {/* <Footer /> */}
    </NotificationProvider>
  );
};

export default page;
