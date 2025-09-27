import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import {BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import {SettingBanner} from "../../services/AllService";

export function Home() {
    const sizeCarousel = 36;
    const colorCarousel = "#2a5996";

    const [bannerImages, setBannerImages] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await SettingBanner.getAll();
            setBannerImages(res.data.data)
        })();
    }, []);

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

    return (
        <section id={'home'} className={"home-slider"} style={{width: "100%"}}>
            <Slider {...settings}>
                {bannerImages.map((s, i) => (
                    <div key={i}>
                        <img className={'home-banner'} src={s.img_url} alt={s.name}/>
                    </div>
                ))}
            </Slider>
        </section>
    );
}