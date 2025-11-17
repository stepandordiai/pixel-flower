import "./Socials.scss";

const Socials = () => {
	return (
		<div className="socials">
			<h2 className="socials__title">Ми в соціальних мережах!</h2>
			<div className="socials__container">
				<a
					href="https://www.instagram.com/pixelflower.studio/"
					target="_blank"
					data-value="Instagram"
				>
					<i class="fa-brands fa-instagram"></i>
				</a>
				<a
					href="https://www.tiktok.com/@pixelflower.studio"
					target="_blank"
					data-value="TikTok"
				>
					<i class="fa-brands fa-tiktok"></i>
				</a>
				<a
					href="https://www.facebook.com/profile.php?id=61580692074316"
					target="_blank"
					data-value="Facebook"
				>
					<i class="fa-brands fa-facebook"></i>
				</a>
			</div>
		</div>
	);
};

export default Socials;
