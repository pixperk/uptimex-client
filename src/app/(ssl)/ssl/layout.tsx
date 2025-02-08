import LayoutBody from "@/components/LayoutBody";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ReactElement, ReactNode } from "react";

export default function StatusLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <ProtectedRoute>
      <LayoutBody>{children}</LayoutBody>
    </ProtectedRoute>
  );
}
