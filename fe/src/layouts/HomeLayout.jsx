import {HomeHeader} from "../components/home/HomeHeader";
import {Home} from "../pages/home/Home";
import {Category} from "../pages/home/Category";
import './HomeLayout.css';
import {Gallery} from "../pages/home/Gallery";
import {Footer} from "../pages/home/Footer";

export function HomeLayout(){
    return (
        <section id={"home-layout"}>
            <HomeHeader/>
            <main>
                <Home/>
                <Category/>
                <Gallery/>
            </main>
            <Footer/>
        </section>
    );
}
