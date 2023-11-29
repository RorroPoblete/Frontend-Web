import './Footer.css';
import { BsGithub } from "react-icons/bs";
import { FaReact } from "react-icons/fa";

function Footer (){
    return (
        <div className="footer">
            <p>&copy; 2023 Sport Teamer | Grupo JRG | Tecnologías y Aplicaciones Web 2023-2</p>
            <BsGithub /> <FaReact />
        </div>
    );
}

export default Footer;