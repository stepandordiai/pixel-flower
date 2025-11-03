import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import ChristeningBoy from "./pages/ChristeningBoy/ChristeningBoy";
import ChristeningGirl from "./pages/ChristeningGirl/ChristeningGirl";
import WeddingOne from "./pages/WeddingOne/WeddingOne";
import WeddingTwo from "./pages/WeddingTwo/WeddingTwo";
import BirthdayOne from "./pages/BirthdayOne/BirthdayOne";
import NotFound from "./pages/NotFound/NotFound";
import "./scss/App.scss";

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/wedding-one/:id" element={<WeddingOne />} />
				<Route path="/wedding-two/:id" element={<WeddingTwo />} />
				<Route path="/christening-boy/:id" element={<ChristeningBoy />} />
				<Route path="/christening-girl/:id" element={<ChristeningGirl />} />
				<Route path="/birthday-one/:id" element={<BirthdayOne />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
