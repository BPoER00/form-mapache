"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { NotificationProvider } from "@/contexts/Notify";

const page = () => {
  return (
    <NotificationProvider>
      <Navbar />
      <Footer />
    </NotificationProvider>
  );
};

export default page;
