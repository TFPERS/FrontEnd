import Navbar from "../Navbar/index";
import Head from "next/head";

type MyComponentProps = React.PropsWithChildren<{}>;
export interface ILayout {}

const Layout: React.FC<ILayout> = ({ children }: MyComponentProps) => {
  return (
    <>
      <div className="min-h-screen flex flex-col p-10">
        <Navbar />
        <>{children}</>
      </div>
    </>
  );
};

export default Layout;
