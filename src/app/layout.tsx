import type { ReactNode } from "react";

import { Aside } from "@/components/Aside/Aside";
import { ProgressBarController } from "@/components/Common/ProgressBarController";
import ReduxProvider from "@/store/provider";
import "./globals.css";

const RootLayout = async ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <title>Masha From Russia</title>
    </head>
    <body>
      <ReduxProvider>
        <Aside />
        <main className="min-h-screen box-border flex flex-col justify-center items-center h-full flex-grow pl-[45px] pr-[30px] pt-[66px] pb-[45px]">
          <ProgressBarController />
          {children}
        </main>
      </ReduxProvider>
    </body>
  </html>
);

export default RootLayout;
