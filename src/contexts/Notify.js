// contexts/Notify.js
import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    return new Promise((resolve) => {
      const id = Date.now();

      const newNotification = {
        id,
        message,
        type,
        resolve: type === "question" ? resolve : null,
      };

      setNotifications((prev) => [...prev, newNotification]);

      if (type !== "question") {
        setTimeout(() => {
          removeNotification(id);
        }, 3000);
        resolve();
      }
    });
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
