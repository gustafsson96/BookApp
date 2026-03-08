import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LayoutPage = () => {
    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}

export default LayoutPage;