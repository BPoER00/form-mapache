// components/UI/Globales/Toast.js
import React from "react";
import { useNotification } from "@/contexts/Notify";
import clsx from "clsx";

const Toast = () => {
  const { notifications } = useNotification();

  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-5 right-5 z-50 flex flex-col gap-3"
    >
      {notifications.map(({ id, message, type }) => (
        <section
          key={id}
          role="alert"
          className={clsx(
            "px-4 py-2 rounded shadow-lg text-white text-sm max-w-xs transition-all duration-300",
            {
              "bg-green-600": type === "success",
              "bg-red-600": type === "error",
              "bg-yellow-500": type === "warning",
              "bg-blue-600": type === "info",
            }
          )}
        >
          <p>{message}</p>
        </section>
      ))}
    </aside>
  );
};

export default Toast;
