import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

function Carousel({ items }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index} className="sport-slide">
          <img src={item.backgroundImg} alt="cancha" />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;