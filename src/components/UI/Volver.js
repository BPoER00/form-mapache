import Link from "next/link";
import React from "react";

const Volver = () => {
  return (
    <article className="w-full h-16 bg-white shadow-md flex items-center justify-center">
      <section className="w-10/12 h-10">
        <Link href={"/"}>
          <h5 className="text-blue-500 text-lg font-semibold flex items-center gap-2 hover:text-blue-100 transition-colors duration-300">
            <code className="text-2xl">&#8592;</code> Volver
          </h5>
        </Link>
      </section>
    </article>
  );
};

export default Volver;
