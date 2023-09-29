import logo from '../assets/images/logo.png'
export default function Header() {

    return (
       
            <header className="bg-white shadow">
              <div className="container flex items-center justify-between px-4 py-4 mx-auto border-r-2 border-slate-500">
                <div className="logo">
                  <img className='h-10 w-50 ' src={logo} alt="Logo" /> 
                </div>
                
                <div className="search">
                  <form>
                    <input className="px-4 py-2 bg-gray-100 rounded-full outline-none ring-1 ring-rose-600 focus:ring-rose-500" type="text" placeholder="Rechercher..." />
                    <button type="submit" className="ml-2 text-red-600 rounded btn bg-primary">
                      R
                    </button>
                  </form>
                </div>
        
                <ul className="flex">
                  <li className="mr-4">
                  <p className="px-5 py-2 font-mono text-xl text-blue-500 bg-b-500">Rejoindre la communauté</p>
                  </li>
                  <li>
                    <button className="px-5 py-2 font-mono text-xl text-white bg-red-500 rounded-full tex5t-white">Connexion</button>
                  </li>
                </ul>
              </div>
            </header>
          );
}




