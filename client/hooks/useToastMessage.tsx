"use client";

import ToastMessage from "@/components/ui/ToastMessage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type ToastMessageStatus = "success" | "warning" | "failed" | "others";

interface ToastMessageContextType {
  showToastMessage: (
    status: ToastMessageStatus,
    message: string,
    duration?: number
  ) => void;
}

const ToastMessageContext = createContext<ToastMessageContextType | null>(null);

export function ToastMessageProvider({ children }: { children: ReactNode }) {
  const [toastMessage, setToastMessage] = useState<{
    status: ToastMessageStatus;
    message: string;
    duration: number;
    key: number;
  } | null>(null);

  const showToastMessage = useCallback(
    (status: ToastMessageStatus, message: string, duration: number = 3000) => {
      setToastMessage({ status, message, duration, key: Date.now() });
    },
    []
  );

  return (
    <ToastMessageContext.Provider value={{ showToastMessage }}>
      {children}

      {toastMessage && (
        <ToastMessage
          status={toastMessage.status}
          message={toastMessage.message}
          duration={toastMessage.duration}
          key={toastMessage.key}
        />
      )}
    </ToastMessageContext.Provider>
  );
}

export function useToastMessage() {
  const context = useContext(ToastMessageContext);

  if (!context)
    throw new Error("useToastMessage must be used within ToastMessageProvider");

  return context;
}
