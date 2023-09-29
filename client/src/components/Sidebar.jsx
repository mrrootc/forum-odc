// import { useState } from "react";
import { useSubjectQuery } from "../api/subject";
import { Link } from "react-router-dom";


export default function SideBar() {
    const { data, isLoading, error } = useSubjectQuery();
    // const [dataSubject, setData] = useState(data)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(data)
    return (
        <div className="fixed w-64 h-screen overflow-y-auto text-white transition-all duration-200 ease-in-out bg-gray-600">

            <div className="p-4">
                <span className="items-center text-2xl font-bold text-center text-white">Thématique</span>
            </div>


            {data.map((item) => (
                <ul className="space-y-2" key={item._id}>
                    <Menu name={item.title} to={item._id} />
                </ul>
            ))}



        </div>
    );
}

const Menu = (pros) => {
    return (
        <Link to={pros.to}>
            <li className="p-4 hover:bg-gray-700">
                <button className="flex text-xl item-center">
                    {/* <i className="mr-2 fas fa-home"></i> */}
                    <span>{pros.name}</span>
                </button>
            </li>
        </Link>
    )

}