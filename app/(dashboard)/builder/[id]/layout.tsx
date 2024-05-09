import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex flex-grow mx-auto">{children}</div>;
};

export default Layout;
