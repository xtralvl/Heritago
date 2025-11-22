import HomeNavAndHero from "../components/homePageComponents/HomeNavAndHero";
import HomeBodyAndFooter from "../components/homePageComponents/HomeBodyAndFooter";
import '../styles/homePageStyles/HomePage.scss'


export default function HomePage() {


    return (
    
        <div className="homepage" >
        <HomeNavAndHero
        />
        <HomeBodyAndFooter
        />
        </div>
    )
};