import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div className="App">
    <Header />
    <div className="flex">
      <SideBar />
      <div className="px-10 py-4">
        <Outlet />
      </div>
    </div>
  </div>
  )
}
