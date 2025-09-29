import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnvelopeBronze from "./pages/EnvelopeBronze/EnvelopeBronze";
import EnvelopeSilver from "./pages/EnvelopeSilver/EnvelopeSilver";
import ChristeningBronze from "./pages/ChristeningBronze/ChristeningBronze";
import ScrollToTop from "./utils/ScrollToTop";
import "./scss/App.scss";

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/envelope-bronze/:id" element={<EnvelopeBronze />} />
				<Route path="/envelope-silver/:id" element={<EnvelopeSilver />} />
				<Route path="/christening-bronze/:id" element={<ChristeningBronze />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
