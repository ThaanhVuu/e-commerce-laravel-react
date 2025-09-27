import "./Gallery.css";
import {BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs";
import Slider from "react-slick";
import {useEffect, useState} from "react";
import {SettingCollection, SettingGallery} from "../../services/AllService";

export function Gallery() {
    const sizeCarousel = 36;
    const colorCarousel = "#2a5996";

    const [gallery, setGallery] = useState([]);
    const [featureCollection, setFeatureCollection] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await SettingGallery.getAll();
            setFeatureCollection(res.data.data);
            let res2 = await SettingCollection.getAll();
            setGallery(res2.data.data)
        })()
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
        infinite: true,
        prevArrow: <Prev/>,
        nextArrow: <Next/>,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <section id={"gallery"} className={"px-5 pt-2 pb-5"}>
            <hr/>
            <h2
                style={{
                    color: "#2a5996",
                    fontSize: "35px",
                }}>
                Gallery of 2025 | Autumn Festival
            </h2>
            <hr/>
            <div className={"gallery"}>
                <Slider {...settings}>
                    {gallery.map((s, i) => (
                        <div key={i} className="slide-item ms-4">
                            <img src={s.img_url} alt={s.name} className={"gallery-img"}/>
                        </div>
                    ))}
                </Slider>
            </div>
            <hr/>
            <h3
                style={{
                    color: "#2a5996",
                    fontSize: "35px",
                }}>
                Featured Collection
            </h3>
            <hr/>
            <div className={"d-flex justify-content-between mt-5 gap-1"}>
                {featureCollection.map((s) => (
                    <img key={s.id} width={"370px"} height={"500px"} style={{objectFit: "fill", borderRadius: "30px"}} src={s.img_url} alt={s.name}/>
                ))}
            </div>
        </section>
    );
}