import { useEffect } from "react";
import "./QA.scss";

const QA = () => {
	useEffect(() => {
		const qaBtn = document.querySelector(".qa-item__btn");

		qaBtn.addEventListener("click", () => {
			const qaItemDd = document.querySelector(".qa-item__dd");
			qaItemDd.classList.toggle("qa-item__dd--active");
		});
	}, []);

	return (
		<div className="qa">
			<h2>Питання та відповіді</h2>
			<div className="qa-item">
				<button className="qa-item__btn">
					<span>Скільки часу займає розробка сайту?</span>
					<span>/</span>
				</button>
				<div className="qa-item__dd">
					<p>
						Якщо ви вибрали план Bronze або Silver то розробка займає від 1 до 3
						днів. Якщо ви вибрали план Gold то час розробки займає від
						індивідуального тизайну та розробки (приблизно від 5 до 10 днів).
					</p>
				</div>
			</div>
			<div className="qa-item">
				<button className="qa-item__btn">
					<span>
						Що робити, якщо після готовності сайту мені потрібно змінити
						інформацію?
					</span>
				</button>
				<div className="qa-item__dd">
					<p>
						В плані Gold доступна безплатна підтримка 24/7 до кінця святкування.
						В плані Silver доступні 3 зміни після чого потрібно буде доплачувати
						за кожну зміну ₴99. В плані Bronze за кожну зміну потрібно доплатити
						₴99
					</p>
				</div>
			</div>
			<div className="qa-item">
				<button className="qa-item__btn">
					<span>
						Чи можу я дивитись запрошення на іншому девайсі окрім телефона?
					</span>
				</button>
				<div className="qa-item__dd">
					<p>Так! Наші сайти запрошення адаптовані під будь-який девайс.</p>
				</div>
			</div>
			<div className="qa-item">
				<button className="qa-item__btn">
					<span>Що робити при відміні свята?</span>
				</button>
				<div className="qa-item__dd">
					<p>
						Якщо вам потрібно відмінити запрошення на етапі розробки, потрібно
						буде сплатити 50% від ціни плана, після готовні сайт оплачується
						повною сумою.
					</p>
				</div>
			</div>
		</div>
	);
};

export default QA;
