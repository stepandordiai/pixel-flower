import "./QA.scss";

const QA = () => {
	return (
		<div className="qa" id="qa">
			<h2 className="qa__title">Питання та відповіді</h2>
			<div className="qa-grid">
				<div className="qa-item">
					<p className="qa-item__title">Скільки часу займає розробка сайту?</p>
					<div className="qa-item__desc">
						<p>Тривалість залежить від обраного тарифного плану:</p>
						<ul className="qa-list">
							<li>Bronze / Silver – від 1 до 3 робочих днів.</li>
							<li>
								Gold – індивідуальний дизайн та розробка, орієнтовно від 5 до 10
								робочих днів.
							</li>
						</ul>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						Що робити, якщо після готовності сайту мені потрібно змінити
						інформацію?
					</p>
					<div className="qa-item__desc">
						<p>Можливості змін залежать від обраного тарифного плану:</p>
						<ul className="qa-list">
							<li>
								Bronze – зміни оплачуються окремо, вартість однієї зміни
								становить ₴99.
							</li>
							<li>
								Silver – доступно 3 безкоштовні зміни, після чого вартість
								кожної додаткової зміни становить ₴99.
							</li>
							<li>
								Gold – безкоштовна підтримка 24/7 до кінця святкового періоду.
							</li>
						</ul>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						Чи можу я переглядати запрошення на іншому пристрої, окрім телефону?
					</p>
					<div className="qa-item__desc">
						<p>
							Так! Наші сайти-запрошення повністю адаптовані під будь-який
							пристрій: смартфон, планшет або комп’ютер.
						</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						Що робити, якщо потрібно скасувати свято?
					</p>
					<div className="qa-item__desc">
						<ul className="qa-list">
							<li>
								Якщо запрошення скасовано на етапі розробки, сплачується 50% від
								вартості обраного плану.
							</li>
							<li>
								Якщо сайт уже готовий, сплата здійснюється повною сумою обраного
								плану.
							</li>
						</ul>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						Чи залишиться сайт-запрошення в мене після свята?
					</p>
					<div className="qa-item__desc">
						<ul className="qa-list">
							<li>
								Якщо ви обрали план Gold, сайт-запрошення буде доступне для вас
								необмежений час — доки оплачується ваш домен.
							</li>
							<li>
								Для інших тарифних планів сайт-запрошення також залишається у
								вашому доступі, проте з часом його робота може бути припинена.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QA;
