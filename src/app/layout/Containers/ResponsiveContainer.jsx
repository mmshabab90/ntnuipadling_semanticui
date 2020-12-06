import React from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export default function ResponsiveContainer({ children }) {
  return (
    <>
      <DesktopLayout>{children}</DesktopLayout>
      <MobileLayout>{children}</MobileLayout>
    </>
  );
}
