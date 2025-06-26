"use client";
import SeccionObjetos from "@/components/SeccionObjetos";
import Navbar from "@/components/UI/Navbar/Navbar";
import Toast from "@/components/UI/Toast";
import Volver from "@/components/UI/Volver";
import { NotificationProvider } from "@/contexts/Notify";
import React from "react";

const page = () => {
  return (
    <NotificationProvider>
      <Navbar />
      <Volver />

      <SeccionObjetos />
      <Toast />
      {/* <Footer /> */}
    </NotificationProvider>
  );
};

export default page;
