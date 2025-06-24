import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cards = ({ url, imagen, nombre, descripcion, index }) => {
  return (
    <Link
      key={index}
      href={url}
      className="w-3/12 h-56 relative overflow-hidden group"
    >
      <div className="w-full h-full bg-black opacity-60 absolute z-10" />

      <Image
        {...imagen}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
      />

      <hgroup className="text-white absolute bottom-0 right-0 p-4 text-right z-20">
        <h3 className="font-bold text-xl">{nombre}</h3>
        <span>{descripcion}</span>
      </hgroup>
    </Link>
  );
};

export default Cards;
