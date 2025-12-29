"use client";

import NotificationsTable from "@/features/notifications/NotificationsTable";
import { useReload } from "@/hooks/useReload";

export default function NotificationsPage() {
  const { reload, handleReload } = useReload();

  return (
    <>
      <NotificationsTable
        onReloadNotifications={handleReload}
        reloadNotifications={reload}
      />
    </>
  );
}
