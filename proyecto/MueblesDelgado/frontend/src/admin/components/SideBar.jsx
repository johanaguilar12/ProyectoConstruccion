import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronLeft, faClipboardList, faListAlt, faRoute, faSignOut, faTruck, faUserShield, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import './SideBar.css';
import { useAuthStore } from "../../hooks";

export const SideBar = () => {
    const { startLogout } = useAuthStore();
    const location = useLocation();
    const activeTab = location.pathname.replace('/admin/panel','');

    const getElements = () => {
        const buttonSideBar = document.getElementById('toggle-btn');
        const buttonDropDown = document.getElementById('dropdown-btn');
        const sidebar = document.getElementById('sidebar');
        return { buttonSideBar, sidebar, buttonDropDown };
    };

    const toggleSubMenu = (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        const { sidebar, buttonSideBar } = getElements();

        if (!button.nextElementSibling.classList.contains('show')) {
            closeAllSubMenus();
        }

        button.nextElementSibling.classList.toggle('show');
        button.classList.toggle('rotate');

        if (sidebar.classList.contains('close')) {
            sidebar.classList.toggle('close');
            buttonSideBar.classList.toggle('rotate');
        }
    };

    const toggleSidebar = (e) => {
        e.preventDefault();
        const { buttonSideBar, sidebar } = getElements();

        sidebar.classList.toggle('close');
        buttonSideBar.classList.toggle('rotate');

        closeAllSubMenus();
    };

    const closeAllSubMenus = () => {
        const { sidebar } = getElements();
        Array.from(sidebar.getElementsByClassName('show')).forEach((ul) => {
            ul.classList.remove('show');
            ul.previousElementSibling.classList.remove('rotate');
        });
    };

    useEffect(() => {
        const { sidebar } = getElements();
        const handleResize = () => {
            if (window.innerWidth <= 800 && sidebar.classList.contains('close')) {
                sidebar.classList.remove('close');
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav id="sidebar">
            <ul>
                <li>
                    <span className="logo">
                        <img src="/LogoMD.webp" alt="logo" height={70} width={100} />
                    </span>
                    <button onClick={toggleSidebar} id="toggle-btn">
                        <FontAwesomeIcon icon={faChevronLeft} className="sizeSVG" />
                    </button>
                </li>

                <li className={activeTab === '' ? 'active' : ''}>
                    <Link to={''}>
                        <FontAwesomeIcon icon={faClipboardList} className="sizeSVG" />
                        <span>Inventariado</span>
                    </Link>
                </li>

                <li className={activeTab === '/deliveryroutes' ? 'active' : ''}>
                    <Link to={'deliveryroutes'}>
                        <FontAwesomeIcon icon={faRoute} className="sizeSVG" />
                        <span>Rutas de Entrega</span>
                    </Link>
                </li>

                <li className={activeTab === '/searchfurniture' ? 'active' : ''}>
                    <Link to={'searchfurniture'}>
                        <FontAwesomeIcon icon={faWarehouse} className="sizeSVG" />
                        <span>Almacenista</span>
                    </Link>
                </li>

                {/* LOGÍSTICA (dropdown) */}
                <li>
                    <button onClick={toggleSubMenu} className="dropdown-btn" id="dropdown-btn">
                        <FontAwesomeIcon icon={faTruck} className="sizeSVG" />
                        <span>Logística</span>
                        <FontAwesomeIcon icon={faChevronDown} className="sizeSVG" />
                    </button>
                    <ul className="sub-menu">
                        <div>
                            <li className={activeTab === '/deliveryadmin' ? 'active' : ''}>
                                <Link to={'deliveryadmin'}>Gestión de Flota</Link>
                            </li>
                            <li className={activeTab === '/registertruck' ? 'active' : ''}>
                                <Link to={'registertruck'}>Dar de alta Camión</Link>
                            </li>
                            <li className={activeTab === '/registerdriver' ? 'active' : ''}>
                                <Link to={'registerdriver'}>Dar de alta Chófer</Link>
                            </li>
                        </div>
                    </ul>
                </li>
                <li className={activeTab === '/orderadministration' ? 'active' : ''}>
                    <Link to={'orderadministration'}>
                        <FontAwesomeIcon icon={faListAlt} className="sizeSVG" />
                        <span>Órdenes</span>
                    </Link>
                </li>
                {/* ADMINISTRADOR (dropdown) */}
                <li>
                    <button onClick={toggleSubMenu} className="dropdown-btn" id="dropdown-btn">
                        <FontAwesomeIcon icon={faUserShield} className="sizeSVG" />
                        <span>Administrador</span>
                        <FontAwesomeIcon icon={faChevronDown} className="sizeSVG" />
                    </button>
                    <ul className="sub-menu">
                        <div>
                            <li className={activeTab === '/createaccount' ? 'active' : ''}>
                                <Link to={'createaccount'}>Nueva Cuenta</Link>
                            </li>
                            <li className={activeTab === '/deleteaccount' ? 'active' : ''}>
                                <Link to={'deleteaccount'}>Borrar Cuenta</Link>
                            </li>
                        </div>
                    </ul>
                </li>

                <li>
                    <button className="dropdown-btn" onClick={startLogout}>
                        <FontAwesomeIcon icon={faSignOut} color="red" className="sizeSVG" />
                        <span>Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};
