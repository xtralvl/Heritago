import HomeNavAndHero from "../components/homePageComponents/HomeNavAndHero";
import HomeBodyAndFooter from "../components/homePageComponents/HomeBodyAndFooter";
import { Pages } from "../components/myAccountComponents/data/Pages";

interface HomePageProps {
    switchToPage: (page: Pages) => void;
};

export default function HomePage({switchToPage}: HomePageProps) {

    return (
        <>
        <HomeNavAndHero
        switchToPage = {switchToPage}
        />
        <HomeBodyAndFooter
        switchToPage ={switchToPage}
        />
        </>
    )
};