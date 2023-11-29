import './Landing.css';
import Chat from '../../chat/Chat';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import basquetImg from '../../assets/img/basquet.png';
import futbolImg from '../../assets/img/futbol.png';
import padelImg from '../../assets/img/padel.png';
import tenisImg from '../../assets/img/tenis.png';
import Footer from '../../common/Footer';
import Carousel from './Caruousel';
import PrimaryButton from '../../common/buttons/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton';


const sportsData = [
  {
    name: 'Tenis',
    description: 'Encuentra tu rival o pareja ideal.',
    backgroundImg: tenisImg,
  },
  {
    name: 'Baloncesto',
    description: 'Busca tu quinteto ideal.',
    backgroundImg: basquetImg,
  },
  {
    name: 'Fútbol',
    description: 'Busca compañeros para tus partidos.',
    backgroundImg: futbolImg,
  },
  {
    name: 'Pádel',
    description: 'Encuentra tu rival o pareja ideal.',
    backgroundImg: padelImg,
  },
];

function Landing() {

  return (
    <div className="landing">
      <Chat />
      <div className="brand-name">
        <h3>SPORT TEAMER</h3>
      </div>
      <main>
        <h3>¡Conéctate y juega al deporte que amas!</h3>
        <p className="description">Imagina un mundo donde los equipos deportivos nunca más tengan que pasar horas buscando a otro equipo contra quien jugar. Sport Teamer es esa solución: una red social innovadora diseñada específicamente para conectar a equipos de diversos deportes, permitiéndoles hacer “match” y enfrentarse en tiempo real.</p>
        <div className="cta-buttons">
          <PrimaryButton href="/principal" text="Busca tu pareja/equipo" />
          <SecondaryButton href="/instructions" text="¿Cómo funciona?" />
        </div>
      </main>

      <Carousel items={sportsData} />

      <div className="contact">
        <h3>Contacto</h3>
        <p>¿Quieres algún otro deporte en nuestra página? ¡Contáctanos!</p>
        <SecondaryButton href="/instructions" text="Enviar un mensaje" />
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
