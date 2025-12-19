"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";

export function SWRProvider({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: any;
}) {
  return (
    <SWRConfig
      value={{
        fetcher,
        fallback,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 1000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
