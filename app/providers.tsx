"use client";
import NextTopLoader from "nextjs-toploader";
import React, { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function Providers({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ fetcher }}>
      <NextTopLoader showSpinner={false} />
      {children}
    </SWRConfig>
  );
}
