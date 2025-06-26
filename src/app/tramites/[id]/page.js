"use client";
import SeccionFormulario from "@/components/SeccionFormulario";
import Navbar from "@/components/UI/Navbar/Navbar";
import Toast from "@/components/UI/Toast";
import Volver from "@/components/UI/Volver";
import { NotificationProvider } from "@/contexts/Notify";
import React, { use } from "react";

const page = (props) => {
  const params = use(props.params);
  return (
    <NotificationProvider>
      <Navbar />
      <Volver />

      <SeccionFormulario />

      <Toast />
    </NotificationProvider>
  );
};

export default page;
