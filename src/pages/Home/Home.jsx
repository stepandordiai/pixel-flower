import { NavLink } from "react-router-dom";
import data from "./../../assets/data/data.json";
import "./Home.scss";

const Home = () => {
	return (
		<main className="home">
			{data.map((envelope) => {
				return (
					<NavLink to={`/envelope-${envelope.type}/${envelope.id}`}>
						{envelope.id}
					</NavLink>
				);
			})}
		</main>
	);
};

export default Home;
