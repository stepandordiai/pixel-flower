"use client";

import { useRef, useState } from "react";
import styles from "./OurFeatures.module.scss";
import PauseIcon from "@/app/icons/PauseIcon";
import PlayIcon from "@/app/icons/PlayIcon";
import Lng from "../../common/Lng/Lng";

const ourFeatures = [
	{
		title: "Анімований вступ",
		desc: "Створює яскраве перше враження та задає атмосферу вашого свята з перших секунд",
		videoSrc: "/video1.mp4",
	},
	{
		title: "Галерея ваших фото",
		desc: "Це не просто фото — це ваша історія, яку можна переглядати знову і знову.",
		videoSrc: "/video5.mp4",
	},
	{
		title: "Персоналізація гостей",
		desc: "Індивідуальне звернення до кожного",
		imageSrc: "/image1.jpg",
	},
	{
		title: "Інтерактивна мапа",
		desc: "Легко знайти локацію без зайвих запитань",
		videoSrc: "/video3.mp4",
	},
	{
		title: "Таймер зворотнього відліку",
		desc: "Нагадує про важливий день",
		videoSrc: "/video4.mp4",
	},
	{
		title: "Анімації",
		desc: "Створюють wow-ефект з першого перегляду",
		videoSrc: "/video2.mp4",
	},
	{
		title: "Фонова музика",
		desc: "Передає атмосферу вашого свята",
		music: "/wedding-three/music.mp3",
	},
	{
		title: "Підтримка кількох мов",
		desc: "Зручно для гостей з різних країн",
		lng: true,
	},
];

const OurFeatures = () => {
	const audioRef = useRef<HTMLAudioElement>(null);

	const [playing, setPlaying] = useState(false);

	const handleAudio = () => {
		if (!audioRef.current) return;

		if (playing) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}

		setPlaying((prev) => !prev);
	};

	return (
		<section className={styles["our-features"]} id="our-features">
			<h2 className={styles["our-features__title"]}>
				Ваше запрошення - більше, ніж просто сайт
			</h2>
			<div className={styles["our-features-grid"]}>
				{ourFeatures.map((card, i) => {
					return (
						<div key={i} className={styles["our-features-grid__card"]}>
							<div style={{ padding: "12.5px" }}>
								<h3 style={{ fontSize: "18px", fontWeight: 500 }}>
									{card.title}
								</h3>
								<p>{card.desc}</p>
							</div>
							<div className={styles["our-features__video-container"]}>
								{card.videoSrc && (
									<video autoPlay loop muted playsInline>
										<source src={card.videoSrc} type="video/mp4" />
									</video>
								)}
								{card.imageSrc && <img src={card.imageSrc} alt="" />}
								{card.music && (
									<>
										<button
											style={{
												width: "50px",
												height: "50px",
												background: "white",
												border: "1px solid black",
												borderRadius: "50%",
											}}
											onClick={handleAudio}
										>
											{playing ? (
												<PauseIcon size={24} />
											) : (
												<PlayIcon size={24} />
											)}
										</button>
										<audio ref={audioRef} src={card.music}></audio>
									</>
								)}
								{card.lng && (
									<Lng
										styles={{
											position: "absolute",
											right: "12.5px",
											bottom: "12.5px",
										}}
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default OurFeatures;
