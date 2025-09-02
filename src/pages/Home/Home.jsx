import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/Header";
import Options from "../../components/Options/Options";
import { useEffect } from "react";
import Templates from "../../components/Templates/Templates";
import "./Home.scss";

const Home = () => {
	useEffect(() => {
		document.body.style.overflow = "auto";
	}, []);

	return (
		<>
			<Helmet>
				<title>Весільні сайт-запрошення &sim; pixel flower</title>
			</Helmet>
			<Header />
			<main className="home">
				<Templates />
				<Options />
			</main>
		</>
	);
};

export default Home;
