import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

export default function Home() {
  return (
    <div className="App">
    <Header />
    <div className="flex">
      <SideBar />
      {/* <Content /> */}
    </div>
  </div>
  )
}
