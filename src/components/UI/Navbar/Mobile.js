import { IMAGENES_NAV } from "@/constants/imagenes";
import Image from "next/image";

const Mobile = () => {
  return (
    <nav className="lg:hidden w-full min-h-8 h-auto bg-[#0A3A5F] text-white flex items-center justify-center p-5">
      <article className="w-full flex items-center justify-center gap-10">
        {IMAGENES_NAV.map((image, index) => (
          <Image key={index} {...image} className="w-36 h-10" />
        ))}
      </article>
    </nav>
  );
};

export default Mobile;
