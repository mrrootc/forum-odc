

export default function SideBar() {
    return (
        <div className="fixed w-64 h-screen overflow-y-auto text-white transition-all duration-200 ease-in-out bg-gray-400">

            <div className="p-4">
                <span className="items-center text-2xl font-bold text-center text-gray-700">Thématique</span>
            </div>

            {/* Menu Items */}
            <ul className="space-y-2">
                <Menu name="Acueil" />
            </ul>
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