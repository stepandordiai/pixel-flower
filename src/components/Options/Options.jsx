import checkGrayIcon from "/icons/check-gray.png";
import checkAccentIcon from "/icons/check-accent.png";
import "./Options.scss";

const Options = () => {
	const instaUrl = "https://www.instagram.com/pixelflower.studio/";

	return (
		<div className="options-container">
			<p className="options__title">Вартість</p>
			<div className="options">
				<div className="option">
					<p className="option__title">Bronze</p>
					<p className="option__price">
						₴1499{" "}
						<span style={{ textDecoration: "line-through", fontWeight: 400 }}>
							₴1299
						</span>
					</p>
					<a className="option__link" href={instaUrl} target="_blank">
						Залишити заявку
					</a>
					<div className="option__info">
						<p className="option__info-title">Що входить:</p>
						<div className="option__info-list">
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>
									Персональна сторінка з вашими іменами, фото та датою весілля
								</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Інтерактивна мапа з адресою локації</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Індивідуальний дизайн у стилі свята</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Підтримка до самого дня весілля</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Зручний розклад подій</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Дрес-код</span>
							</p>
							<p>
								<img src={checkGrayIcon} width={20} height={20} alt="" />{" "}
								<span>Таймер зворотнього відліку</span>
							</p>
							<p>
								<img src={checkGrayIcon} width={20} height={20} alt="" />{" "}
								<span>Підтримка кількох мов</span>
							</p>
							<p>
								<img src={checkGrayIcon} width={20} height={20} alt="" />{" "}
								<span>Додаткові розділи за бажанням</span>
							</p>
							<p>
								<img src={checkGrayIcon} width={20} height={20} alt="" />{" "}
								<span>Індивідуальний дизайн та розробка</span>
							</p>
							<p>
								<img src={checkGrayIcon} width={20} height={20} alt="" />{" "}
								<span>Власний домен</span>
							</p>
						</div>
					</div>
				</div>
				<div className="option">
					<p className="option__title">Silver</p>
					<p className="option__price">
						₴2499{" "}
						<span style={{ textDecoration: "line-through", fontWeight: 400 }}>
							₴1799
						</span>
					</p>
					<a className="option__link" href={instaUrl} target="_blank">
						Залишити заявку
					</a>
					<span
						style={{
							position: "absolute",
							top: 20,
							right: 20,
							background: "var(--accent-clr-yellow)",
							border: "1px solid #000",
							padding: "5px",
							borderRadius: "15px",
						}}
					>
						Популярний
					</span>
					<div className="option__info">
						<p className="option__info-title">Що входить:</p>
						<div className="option__info-list">
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>
									Персональна сторінка з вашими іменами, фото та датою весілля
								</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Інтерактивна мапа з адресою локації</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Індивідуальний дизайн у стилі свята</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Підтримка до самого дня весілля</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Зручний розклад подій</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Підтримка кількох мов</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Таймер зворотнього відліку</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Дрес-код</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Додаткові розділи за бажанням</span>
							</p>
							<p>
								<img src={checkGrayIcon} width={20} height={20} alt="" />{" "}
								<span>Індивідуальний дизайн та розробка</span>
							</p>
							<p>
								<img src={checkGrayIcon} width={20} height={20} alt="" />{" "}
								<span>Власний домен</span>
							</p>
						</div>
					</div>
				</div>
				<div className="option">
					<p className="option__title">Gold</p>
					<p className="option__price">від ₴3499</p>
					<a className="option__link" href={instaUrl} target="_blank">
						Залишити заявку
					</a>
					<div className="option__info">
						<p className="option__info-title">Що входить:</p>
						<div className="option__info-list">
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>
									Персональна сторінка з вашими іменами, фото та датою весілля
								</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Інтерактивна мапа з адресою локації</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Індивідуальний дизайн у стилі свята</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Підтримка до самого дня весілля</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Зручний розклад подій</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Підтримка кількох мов</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Таймер зворотнього відліку</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Дрес-код</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Додаткові розділи за бажанням</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Індивідуальний дизайн та розробка</span>
							</p>
							<p>
								<img src={checkAccentIcon} width={20} height={20} alt="" />{" "}
								<span>Власний домен</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Options;
