// components/UI/Globales/Toast.js
import React from "react";
import { useNotification } from "@/contexts/Notify";
import clsx from "clsx";

const Toast = () => {
  const { notifications, removeNotification } = useNotification();

  const handleResponse = (id, resolve, response) => {
    resolve(response);
    removeNotification(id);
  };

  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-5 right-5 z-50 flex flex-col gap-3"
    >
      {notifications.map(({ id, message, type, resolve }) => (
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
              "bg-gray-800": type === "question",
            }
          )}
        >
          <p className="mb-2">{message}</p>

          {type === "question" && (
            <div className="flex justify-end gap-2">
              <button
                className="bg-white text-black px-2 py-1 rounded text-xs hover:bg-gray-200"
                onClick={() => handleResponse(id, resolve, true)}
              >
                Sí
              </button>
              <button
                className="bg-white text-black px-2 py-1 rounded text-xs hover:bg-gray-200"
                onClick={() => handleResponse(id, resolve, false)}
              >
                No
              </button>
            </div>
          )}
        </section>
      ))}
    </aside>
  );
};

export default Toast;
