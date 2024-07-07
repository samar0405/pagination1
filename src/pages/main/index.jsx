import { Outlet } from "react-router-dom";
import Sidebar from "../../components/ui/sidebar/index";
import Header from "../../components/ui/header/index";
import "./index.css";

const Index = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="headdd">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Index;
