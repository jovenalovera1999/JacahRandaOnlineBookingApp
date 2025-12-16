"use client";

import { useState } from "react";

export function useReload() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return { reload, handleReload };
}
