import Slider from "react-slick";
import shirt from "../../assets/product/ao-1.png";
import "./Category.css";

export function Category() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 5,   // hiển thị 4 card cùng lúc
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true
    };

    const items = Array(9).fill({ src: shirt, name: "Shirt" });

    return (
        <section id="category" className="p-5">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index} className="d-flex justify-content-center">
                        <div className="card" style={{height: "200px", width: "200px"}}>
                            <img
                                src={item.src}
                                alt={item.name}
                                className="mx-auto d-block"
                                style={{ height: "120px", width: "auto", objectFit: "contain" }}
                            />
                            <div className="card-body">
                                <p className="card-text h3 text-center fw-bold">{item.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
