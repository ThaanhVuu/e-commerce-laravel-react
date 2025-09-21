import "./Gallery.css";
import {BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs";
import gallery1 from '../../assets/gallery/gallery1.png';
import Slider from "react-slick";

export function Gallery() {
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
        infinite: true,
        prevArrow: <Prev/>,
        nextArrow: <Next/>,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 5000
    };

    const galleries = Array(9).fill({
        src: gallery1, alt: "gallery image 1", description: "A description about gallery"
    })

    const galleries2 = Array(4).fill({
        src: gallery1, alt: "gallery image 1", description: "A description about gallery"
    })

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
            <div className={""}>
                <Slider {...settings}>
                    {galleries.map((s, i) => (
                        <div key={i} className="slide-item ms-5 ps-3">
                            <img src={s.src} alt={s.alt}/>
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
            <div className={"d-flex justify-content-around mt-5 gap-5"}>
                {galleries2.map((s, i) => (
                    <img key={i} width={"auto"} height={"550px"} src={s.src} alt={s.alt} className={""}/>
                ))}
            </div>
        </section>
    );
}