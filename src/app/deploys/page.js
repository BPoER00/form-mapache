"use client";
import SeccionDeploys from "@/components/SeccionDeploys";
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
      <SeccionDeploys />
      <Toast />
    </NotificationProvider>
  );
};

export default page;
