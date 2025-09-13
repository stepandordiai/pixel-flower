import "./QA.scss";

const QA = () => {
	return (
		<div className="qa" id="qa">
			<h2 className="qa__title">Питання та відповіді</h2>
			<div className="qa-grid">
				<div className="qa-item">
					<p className="qa-item__title">Скільки часу займає розробка сайту?</p>
					<p className="qa-item__desc">
						Якщо ви вибрали план Bronze або Silver то розробка займає від 1 до 3
						днів. Якщо ви вибрали план Gold то час розробки займає від
						індивідуального тизайну та розробки (приблизно від 5 до 10 днів).
					</p>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						Що робити, якщо після готовності сайту мені потрібно змінити
						інформацію?
					</p>
					<p className="qa-item__desc">
						В плані Gold доступна безплатна підтримка 24/7 до кінця святкування.
						В плані Silver доступні 3 зміни після чого потрібно буде доплачувати
						за кожну зміну ₴99. В плані Bronze за кожну зміну потрібно доплатити
						₴99
					</p>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						Чи можу я дивитись запрошення на іншому девайсі окрім телефона?
					</p>
					<p className="qa-item__desc">
						Так! Наші сайти запрошення адаптовані під будь-який девайс.
					</p>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">Що робити при відміні свята?</p>
					<p className="qa-item__desc">
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
