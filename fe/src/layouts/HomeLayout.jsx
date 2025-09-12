import {HomeHeader} from "../components/home/HomeHeader";
import {Home} from "../pages/home/Home";
import {Category} from "../pages/home/Category";

export function HomeLayout(){
    return (
        <>
            <HomeHeader/>
            <main>
                <Home/>
                {/*<Category/>*/}
            </main>
        </>
    );
}
