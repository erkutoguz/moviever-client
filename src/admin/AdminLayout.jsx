import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="dashboard flex">
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
