"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SeccionFormulario from "@/components/SeccionFormulario";
import { NotificationProvider } from "@/contexts/Notify";

const page = () => {
  return (
    <NotificationProvider>
      {/* <Navbar /> */}

      <SeccionFormulario />

      {/* <Footer /> */}
    </NotificationProvider>
  );
};

export default page;
