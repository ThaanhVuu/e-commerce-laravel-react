import Slider from 'react-slick';
import banner1 from '../../assets/Douyin fashion (1).png';
import banner2 from '../../assets/Douyin fashion (2).png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import {BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs";

export function Home() {
    const sizeCarousel = 36;
    const colorCarousel = "#2a5996";

    const Prev = ({className, style, onClick}) => {
        // bỏ qua currentSlide và slideCount trong rest
        return (
            <button
                className={`${className} custom-arrow`}
                style={style}
                onClick={onClick}
                aria-label="prev"
                type="button"
            >
                <BsCaretLeftFill size={sizeCarousel} color={colorCarousel}/>
            </button>
        );
    };

    const Next = ({className, style, onClick}) => {
        return (
            <button
                className={`${className} custom-arrow`}
                style={style}
                onClick={onClick}
                aria-label="next"
                type="button"
            >
                <BsCaretRightFill size={sizeCarousel} color={colorCarousel}/>
            </button>
        );
    };

    const settings = {
        autoplay: true,       // ✅ đúng key
        autoplaySpeed: 3000,
        infinite: true,
        prevArrow: <Prev/>,
        nextArrow: <Next/>
    };

    const slides = [
        {src: banner1, alt: "Banner 1"},
        {src: banner2, alt: "Banner 2"},
    ];

    return (
        <section id={'home'} className={"home-slider"} style={{width: "100%"}}>
            <Slider {...settings}>
                {slides.map((s, i) => (
                    <div key={i}>
                        <img className={'home-banner'} src={s.src} alt={s.alt}/>
                    </div>
                ))}
            </Slider>
        </section>
    );
}