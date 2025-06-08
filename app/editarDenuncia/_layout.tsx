import { ReactNode } from "react";

export const unstable_settings = {
  drawer: {
    // Isso esconde esta rota do Drawer
    hidden: true,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}