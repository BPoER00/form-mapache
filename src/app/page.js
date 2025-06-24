"use client";
import Cards from "@/components/UI/Cards";
import Navbar from "@/components/UI/Navbar/Navbar";
import { OPCIONES } from "@/constants/opciones";
import { NotificationProvider } from "@/contexts/Notify";

const page = () => {
  return (
    <NotificationProvider>
      <Navbar />

      <section className="w-full h-automt-10 flex justify-center items-center">
        <section className="w-11/12 h-auto min-h-10 bg-gray-50 mt-10 flex justify-center items-center gap-10 flex-wrap">
          {OPCIONES.map((opcion, index) => (
            <Cards {...opcion} key={index} />
          ))}
        </section>
      </section>
      {/* <Footer /> */}
    </NotificationProvider>
  );
};

export default page;
