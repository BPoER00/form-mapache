import { IMAGENES_NAV } from "@/constants/imagenes";
import Image from "next/image";

const Desktop = () => {
  return (
    <nav className="hidden lg:flex w-full min-h-8 h-auto bg-[#0A3A5F] text-white items-center justify-between p-5 gap-10">
      <h2 className="text-2xl font-bold px-10">
        Bienvenido a la plataforma de gestion de tramites Sigmun y Sirtagob
      </h2>

      <article className="w-1/4 flex items-center justify-center gap-10">
        {IMAGENES_NAV.map((image, index) => (
          <Image key={index} {...image} className="w-36 h-10" />
        ))}
      </article>
    </nav>
  );
};

export default Desktop;
