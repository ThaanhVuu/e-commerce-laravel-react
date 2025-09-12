import Slider from "react-slick";
import image1 from "../../assets/Douyin fashion (1).png";
import image2 from "../../assets/Douyin fashion (2).png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

export function Home() {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        swipe: true,
        fade: true,          // hiệu ứng mờ giữa 2 ảnh
        cssEase: "linear",
    };

    const slides = [
        { src: image1, alt: "Douyin fashion 1" },
        { src: image2, alt: "Douyin fashion 2" },
    ];

    return (
        <section id="home" className="home-slider">
            <Slider {...settings}>
                {slides.map((s, i) => (
                    <div key={i} className="slide">
                        <img src={s.src} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} />
                    </div>
                ))}
            </Slider>
        </section>
    );
}
