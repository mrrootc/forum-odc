import { useSubjectQuery } from "../api/subject";


export default function SideBar() {
    const { data, isLoading, error } = useSubjectQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(data)
    return (
        <div className="fixed w-64 h-screen overflow-y-auto text-white transition-all duration-200 ease-in-out bg-gray-400">

            <div className="p-4">
                <span className="items-center text-2xl font-bold text-center text-gray-700">Thématique</span>
            </div>


            {data.map((item) => (
                <ul className="space-y-2" key={item._id}>
                    <Menu name={item.title} />
                </ul>
            ))}



        </div>
    );
}

const Menu = (pros) => {
    return (
        <li className="p-4 hover:bg-gray-700">
            <a href="#" className="flex text-xl item-center">
                {/* <i className="mr-2 fas fa-home"></i> */}
                <span>{pros.name}</span>
            </a>
        </li>
    )

}