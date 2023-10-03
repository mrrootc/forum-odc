import logo from '../assets/images/logo.png';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (

    <header className="bg-white shadow ">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto border-r-2 border-slate-500">
        <div className="logo">
          <img className='h-10 w-50 ' src={logo} alt="Logo" />
        </div>

        <div className="search">
          <form>
            <input className="px-4 py-2 bg-gray-100 rounded-full outline-none ring-1 ring-rose-600 focus:ring-rose-500" type="text" placeholder="Rechercher..." />

          </form>
        </div>

        <ul className="flex">
          <li className="mr-4">
            <a className="px-5 py-2 font-mono text-xl text-blue-500 bg-b-500"><Modal /></a>
          </li>
          <li>
            <button onClick={handleLogout} className="px-5 py-2 font-mono text-xl text-white bg-red-500 rounded-full tex5t-white">Deconnexion</button>
          </li>
        </ul>
      </div>
    </header>
  );
}




