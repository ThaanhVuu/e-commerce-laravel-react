import Slider from "react-slick";
import shirt from "../../assets/product/ao-1.png";
import "./Category.css";
import {BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs";

export function Category() {
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
        slidesToShow: 4,   // hiển thị 4 card cùng lúc
        slidesToScroll: 1,
        prevArrow: <Prev/>,
        nextArrow: <Next/>
    };

    const items = Array(9).fill({src: shirt, name: "Shirt", description: "A description about category"});

    return (
        <section id="category" className="p-5">
            <hr/>
            <h2
                style={{
                    color: "#2a5996",
                    fontSize: "35px",
                }}
            >
                Category
            </h2>
            <hr/>
            <br/>
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index} className="d-flex justify-content-center">
                        <div className="card" style={{height: "300px", width: "200px"}}>
                            <img
                                src={item.src}
                                alt={item.name}
                                className="mx-auto d-block category-img"
                                style={{height: "160px", width: "auto", objectFit: "contain"}}
                            />
                            <div className="card-body">
                                <p className="card-text h3 text-center fw-bold">{item.name}</p>
                            </div>
                            <div className="card-body">
                                <p className="card-text text-center">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
