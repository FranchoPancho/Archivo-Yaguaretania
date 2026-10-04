const signals = {
	territorio: {
		code: 'ANOTACIÓN 01',
		kicker: 'EL LUGAR TAMBIÉN NARRA',
		title: '¿Quién decide<br>qué es un hogar?',
		description: 'En una historia, el territorio nunca es solo el fondo. Sigue las marcas del entorno y pregúntate quién puede habitarlo, transformarlo o llamarlo suyo.'
	},
	frontera: {
		code: 'ANOTACIÓN 02',
		kicker: 'LÍMITES EN MOVIMIENTO',
		title: '¿Qué hay al otro<br>lado de la frontera?',
		description: 'Observa cómo se dibujan los límites y quién tiene permiso para cruzarlos. Cada frontera cuenta algo sobre las reglas de ese mundo.'
	},
	memoria: {
		code: 'ANOTACIÓN 03',
		kicker: 'LO QUE MERECE SER RECORDADO',
		title: '¿Qué dejamos<br>escrito en el paisaje?',
		description: 'Piensa qué decisiones humanas transforman el territorio y quiénes viven sus consecuencias. ¿Qué historias merecen conservarse en estas páginas?'
	},
	jaguar: {
		code: 'ANOTACIÓN 04',
		kicker: 'UNA PRESENCIA QUE DEJA HUELLA',
		title: '¿Qué significa<br>el yaguareté?',
		description: 'Sigue la presencia del animal en el título y en tu lectura. Pregúntate qué asociaciones despierta y cómo transforma tu manera de imaginar el territorio.'
	}
};

const signalTabs = [...document.querySelectorAll('.signal-tab')];
const signalPanel = document.querySelector('#signal-panel');

signalTabs.forEach((tab, index) => {
	tab.addEventListener('click', () => {
		const signal = signals[tab.dataset.signal];
		signalTabs.forEach((item) => {
			const selected = item === tab;
			item.classList.toggle('active', selected);
			item.setAttribute('aria-selected', String(selected));
			item.tabIndex = selected ? 0 : -1;
		});
		signalPanel.setAttribute('aria-labelledby', tab.id);
		document.querySelector('#signal-code').textContent = signal.code;
		document.querySelector('#signal-kicker').textContent = signal.kicker;
		document.querySelector('#signal-title').innerHTML = signal.title;
		document.querySelector('#signal-description').textContent = signal.description;
	});

	tab.addEventListener('keydown', (event) => {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
		event.preventDefault();
		const direction = event.key === 'ArrowRight' ? 1 : -1;
		const nextTab = signalTabs[(index + direction + signalTabs.length) % signalTabs.length];
		nextTab.click();
		nextTab.focus();
	});
});

const fieldFacts = {
	range: {
		code: 'NOTA DE CAMPO 01 / DISTRIBUCIÓN',
		title: 'Un territorio<br>de continente.',
		description: 'El jaguar se distribuye desde México hasta Argentina y está presente en 18 países.',
		stat: 'MÉXICO <span>→</span> ARGENTINA'
	},
	movement: {
		code: 'NOTA DE CAMPO 02 / MOVIMIENTO',
		title: 'La selva no es<br>su único camino.',
		description: 'Es un buen nadador y trepador. Necesita grandes territorios conectados y ecosistemas saludables para sobrevivir.',
		stat: 'NADADOR <span>+</span> TREPADOR'
	},
	coat: {
		code: 'NOTA DE CAMPO 03 / PELAJE',
		title: 'Cada roseta<br>deja su firma.',
		description: 'Su pelaje dorado se reconoce por rosetas oscuras. El patrón convierte a cada jaguar en una presencia inconfundible.',
		stat: 'PATRÓN <span>·</span> ROSETAS'
	}
};

const factTabs = [...document.querySelectorAll('.fact-tab')];
const factPanel = document.querySelector('#fact-panel');

factTabs.forEach((tab, index) => {
	tab.addEventListener('click', () => {
		const fact = fieldFacts[tab.dataset.fact];
		factTabs.forEach((item) => {
			const selected = item === tab;
			item.classList.toggle('active', selected);
			item.setAttribute('aria-selected', String(selected));
			item.tabIndex = selected ? 0 : -1;
		});
		factPanel.setAttribute('aria-labelledby', tab.id);
		document.querySelector('#fact-code').textContent = fact.code;
		document.querySelector('#fact-title').innerHTML = fact.title;
		document.querySelector('#fact-description').textContent = fact.description;
		document.querySelector('#fact-stat').innerHTML = fact.stat;
	});

	tab.addEventListener('keydown', (event) => {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
		event.preventDefault();
		const direction = event.key === 'ArrowRight' ? 1 : -1;
		const nextTab = factTabs[(index + direction + factTabs.length) % factTabs.length];
		nextTab.click();
		nextTab.focus();
	});
});

const quizQuestions = [
	{
		question: '¿Entre qué dos países se extiende el rango del jaguar?',
		options: ['México y Argentina', 'Canadá y Chile', 'España y Portugal'],
		answer: 0,
		explanation: 'WWF registra su presencia desde México hasta Argentina.'
	},
	{
		question: '¿Qué patrón caracteriza su pelaje?',
		options: ['Rayas blancas', 'Rosetas oscuras', 'Un color completamente liso'],
		answer: 1,
		explanation: 'Las rosetas oscuras son una de sus marcas más reconocibles.'
	},
	{
		question: '¿Qué habilidades destaca WWF?',
		options: ['Nadar y trepar', 'Volar y planear', 'Vivir solo en el desierto'],
		answer: 0,
		explanation: 'El jaguar es un nadador fuerte y también trepa.'
	}
];

const quizProgress = document.querySelector('#quiz-progress');
const quizQuestion = document.querySelector('#quiz-question');
const quizOptions = document.querySelector('#quiz-options');
const quizFeedback = document.querySelector('#quiz-feedback');
const quizNext = document.querySelector('#quiz-next');
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuizQuestion() {
	const currentQuestion = quizQuestions[quizIndex];
	quizProgress.textContent = `PREGUNTA ${String(quizIndex + 1).padStart(2, '0')} / ${String(quizQuestions.length).padStart(2, '0')}`;
	quizQuestion.textContent = currentQuestion.question;
	quizOptions.replaceChildren();
	quizFeedback.textContent = '';
	quizNext.disabled = true;
	quizNext.innerHTML = 'Siguiente pregunta <span aria-hidden="true">→</span>';
	quizAnswered = false;

	currentQuestion.options.forEach((option, optionIndex) => {
		const button = document.createElement('button');
		button.className = 'quiz-option';
		button.type = 'button';
		button.textContent = option;
		button.addEventListener('click', () => {
			if (quizAnswered) return;
			quizAnswered = true;
			const isCorrect = optionIndex === currentQuestion.answer;
			if (isCorrect) quizScore += 1;
			[...quizOptions.children].forEach((answerButton, answerIndex) => {
				answerButton.disabled = true;
				if (answerIndex === currentQuestion.answer) answerButton.classList.add('correct');
				else if (answerIndex === optionIndex) answerButton.classList.add('incorrect');
			});
			quizFeedback.textContent = isCorrect
				? `¡Correcto! ${currentQuestion.explanation}`
				: `No exactamente. ${currentQuestion.explanation}`;
			quizNext.disabled = false;
			quizNext.focus();
		});
		quizOptions.append(button);
	});
}

quizNext.addEventListener('click', () => {
	if (quizIndex < quizQuestions.length - 1) {
		quizIndex += 1;
		renderQuizQuestion();
		quizQuestion.focus?.();
		return;
	}

	if (quizAnswered) {
		quizProgress.textContent = 'CUESTIONARIO TERMINADO';
		quizQuestion.textContent = `Resultado: ${quizScore} / ${quizQuestions.length}`;
		quizOptions.replaceChildren();
		quizFeedback.textContent = quizScore === quizQuestions.length
			? '¡Buen observador! Has leído todas las notas.'
			: 'Recorrido terminado. Consulta las fichas y vuelve a intentarlo.';
		quizNext.disabled = false;
		quizNext.textContent = 'Repetir desafío';
		quizAnswered = false;
		quizIndex = quizQuestions.length;
		return;
	}

	quizIndex = 0;
	quizScore = 0;
	renderQuizQuestion();
});

renderQuizQuestion();

const gameCells = [...document.querySelectorAll('.game-cell')];
const gameScoreDisplay = document.querySelector('#game-score');
const gameTimeDisplay = document.querySelector('#game-time');
const gameMissesDisplay = document.querySelector('#game-misses');
const gameTimeTrack = document.querySelector('#game-time-track');
const gameTimeFill = document.querySelector('#game-time-fill');
const gameStatus = document.querySelector('#game-status');
const gameStart = document.querySelector('#game-start');
const gameBoard = document.querySelector('#game-board');
const gameHint = document.querySelector('#game-hint');
const gameResult = document.querySelector('#game-result');
const gameResultLabel = document.querySelector('#game-result-label');
const gameResultTitle = document.querySelector('#game-result-title');
const gameResultMessage = document.querySelector('#game-result-message');
const gameResultScore = document.querySelector('#game-result-score');
const gameResultMisses = document.querySelector('#game-result-misses');
const gameResultAccuracy = document.querySelector('#game-result-accuracy');
const gameResultTime = document.querySelector('#game-result-time');
const gameResultBest = document.querySelector('#game-result-best');
const gameDuration = 30;
const gameGoal = 10;
const gameTrailDuration = 2400;
const gameTrapCount = 2;
const gameTrapPenalty = 2;
let gameScore = 0;
let gameMisses = 0;
let gameBestScore = 0;
let gameTime = gameDuration;
let gameTarget = -1;
let gameTraps = new Set();
let gameActive = false;
let gameClock;
let gameTrailTimeout;

function updateGameTime() {
	gameTimeDisplay.textContent = String(gameTime);
	gameTimeTrack.setAttribute('aria-valuenow', String(gameTime));
	gameTimeFill.style.width = `${gameTime / gameDuration * 100}%`;
	gameTimeTrack.classList.toggle('is-urgent', gameActive && gameTime <= 10);
}

function updateGameCells() {
	gameCells.forEach((cell, index) => {
		const hasTrail = index === gameTarget;
		const hasTrap = gameTraps.has(index);
		cell.classList.toggle('has-trail', hasTrail);
		cell.classList.toggle('has-trap', hasTrap);
		cell.setAttribute('aria-label', hasTrail
			? `Huella en el sector ${index + 1}. Pulsa para marcarla.`
			: hasTrap
				? `Trampa de espinas en el sector ${index + 1}. Evita tocarla.`
				: `Sector ${index + 1}, sin huella`);
	});
}

function moveGameTrail() {
	window.clearTimeout(gameTrailTimeout);
	const availableCells = gameCells
		.map((_, index) => index)
		.filter((index) => index !== gameTarget);
	gameTarget = availableCells[Math.floor(Math.random() * availableCells.length)];
	gameTraps.clear();
	const trapCandidates = gameCells
		.map((_, index) => index)
		.filter((index) => index !== gameTarget);
	while (gameTraps.size < Math.min(gameTrapCount, trapCandidates.length)) {
		const randomIndex = Math.floor(Math.random() * trapCandidates.length);
		gameTraps.add(trapCandidates.splice(randomIndex, 1)[0]);
	}
	updateGameCells();
	gameTrailTimeout = window.setTimeout(() => {
		if (!gameActive || gameTarget === -1) return;
		gameMisses += 1;
		gameMissesDisplay.textContent = String(gameMisses).padStart(2, '0');
		gameStatus.textContent = `La huella se escapó. ${gameScore} de ${gameGoal} encontradas; busca la siguiente.`;
		moveGameTrail();
	}, gameTrailDuration);
}

function finishFieldGame(won) {
	gameActive = false;
	window.clearInterval(gameClock);
	window.clearTimeout(gameTrailTimeout);
	gameStart.disabled = false;
	gameTimeTrack.classList.remove('is-urgent');
	gameTarget = -1;
	gameTraps.clear();
	gameCells.forEach((cell, index) => {
		cell.disabled = true;
		cell.classList.remove('has-trail', 'has-trap', 'is-miss', 'is-trap-hit');
		cell.setAttribute('aria-label', `Sector ${index + 1}, sin huella`);
	});
	gameStart.innerHTML = 'Practicar otra vez <span aria-hidden="true">↻</span>';
	gameBoard.hidden = true;
	gameHint.hidden = true;
	gameResult.hidden = false;
	gameResult.classList.toggle('is-win', won);
	gameResult.classList.toggle('is-loss', !won);
	gameResultLabel.textContent = won ? 'RASTREO COMPLETADO' : 'TIEMPO AGOTADO';
	gameResultTitle.textContent = won ? '¡Ganaste!' : 'Esta vez no llegaste.';
	gameResultMessage.textContent = won
		? 'Práctica completada: encontraste todas las huellas.'
		: `Encontraste ${gameScore} de ${gameGoal} huellas. Puedes volver a intentarlo.`;
	const accuracy = gameScore + gameMisses === 0
		? 0
		: Math.round(gameScore / (gameScore + gameMisses) * 100);
	gameBestScore = Math.max(gameBestScore, gameScore);
	gameResultScore.textContent = `${gameScore} / ${gameGoal}`;
	gameResultMisses.textContent = String(gameMisses);
	gameResultAccuracy.textContent = `${accuracy}%`;
	gameResultTime.textContent = `${gameTime} s`;
	gameResultBest.textContent = `${gameBestScore} / ${gameGoal}`;
	gameStatus.textContent = won
		? `¡Bien observado! ${gameScore} huellas en ${gameDuration - gameTime} segundos.`
		: `Se acabó el tiempo: encontraste ${gameScore} de ${gameGoal} huellas.`;
	gameResultTitle.focus();
}

function startFieldGame() {
	window.clearInterval(gameClock);
	window.clearTimeout(gameTrailTimeout);
	gameScore = 0;
	gameMisses = 0;
	gameTime = gameDuration;
	gameActive = true;
	gameScoreDisplay.textContent = '00';
	gameMissesDisplay.textContent = '00';
	gameCells.forEach((cell) => cell.classList.remove('is-miss', 'is-trap-hit'));
	updateGameTime();
	gameStart.innerHTML = 'Rastreando… <span aria-hidden="true">↻</span>';
	gameStart.disabled = true;
	gameStatus.textContent = 'Observa con atención y marca cada huella.';
	gameResult.hidden = true;
	gameResult.classList.remove('is-win', 'is-loss');
	gameBoard.hidden = false;
	gameHint.hidden = false;
	gameCells.forEach((cell) => { cell.disabled = false; });
	moveGameTrail();
	gameClock = window.setInterval(() => {
		gameTime = Math.max(0, gameTime - 1);
		updateGameTime();
		if (gameTime === 0) {
			finishFieldGame(false);
		}
	}, 1000);
}

gameCells.forEach((cell, index) => {
	cell.addEventListener('click', () => {
		if (!gameActive) return;
		if (gameTraps.has(index)) {
			gameTraps.delete(index);
			gameMisses += 1;
			gameMissesDisplay.textContent = String(gameMisses).padStart(2, '0');
			gameTime = Math.max(0, gameTime - gameTrapPenalty);
			updateGameTime();
			cell.classList.add('is-trap-hit');
			window.setTimeout(() => cell.classList.remove('is-trap-hit'), 350);
			if (gameTime === 0) {
				finishFieldGame(false);
				return;
			}
			const safeCells = gameCells
				.map((_, cellIndex) => cellIndex)
				.filter((cellIndex) => cellIndex !== index && cellIndex !== gameTarget && !gameTraps.has(cellIndex));
			if (safeCells.length) {
				gameTraps.add(safeCells[Math.floor(Math.random() * safeCells.length)]);
			}
			updateGameCells();
			gameStatus.textContent = `¡Cuidado con las espinas! Pierdes ${gameTrapPenalty} segundos.`;
			return;
		}
		if (index !== gameTarget) {
			gameMisses += 1;
			gameMissesDisplay.textContent = String(gameMisses).padStart(2, '0');
			gameStatus.textContent = `Ese lugar estaba vacío. ${gameMisses} error${gameMisses === 1 ? '' : 'es'}; sigue observando.`;
			cell.classList.add('is-miss');
			window.setTimeout(() => cell.classList.remove('is-miss'), 300);
			return;
		}
		window.clearTimeout(gameTrailTimeout);
		gameScore += 1;
		gameScoreDisplay.textContent = String(gameScore).padStart(2, '0');
		if (gameScore >= gameGoal) {
			finishFieldGame(true);
			return;
		}
		gameStatus.textContent = `¡Bien visto! ${gameScore} de ${gameGoal}. Busca la siguiente huella.`;
		moveGameTrail();
	});
});

gameStart.addEventListener('click', startFieldGame);

const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
	mainNav.classList.toggle('is-open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Abrir menú');
		mainNav.classList.remove('is-open');
	});
});

const progressBar = document.querySelector('#progress-bar');
const siteHeader = document.querySelector('.site-header');
let progressTicking = false;

window.addEventListener('scroll', () => {
	if (progressTicking) return;
	progressTicking = true;
	window.requestAnimationFrame(() => {
		siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
		const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
		const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight * 100 : 0;
		progressBar.style.width = `${progress}%`;
		progressTicking = false;
	});
}, { passive: true });

siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);

const missionInputs = [...document.querySelectorAll('[data-mission]')];
const missionSection = document.querySelector('#misiones');
const missionCount = document.querySelector('#mission-count');
const missionFill = document.querySelector('#mission-fill');
const missionStatus = document.querySelector('#mission-status');
const missionPercent = document.querySelector('#mission-percent');
const missionTrack = document.querySelector('.progress-track');
const missionReset = document.querySelector('#mission-reset');
const missionRows = [...document.querySelectorAll('[data-mission-item]')];
const missionStations = [...document.querySelectorAll('.progress-stations i')];
const missionStorageKey = 'yaguaretania-reading-missions';
let savedMissions = [];

try {
	savedMissions = JSON.parse(localStorage.getItem(missionStorageKey) || '[]');
} catch {
	savedMissions = [];
}

missionInputs.forEach((input) => {
	input.checked = Array.isArray(savedMissions) && savedMissions.includes(Number(input.dataset.mission));
});

function updateMissionProgress() {
	const completed = missionInputs.filter((input) => input.checked).length;
	const percent = Math.round(completed / missionInputs.length * 100);
	const nextMission = missionInputs.findIndex((input) => !input.checked);
	missionCount.textContent = `${completed} / ${missionInputs.length}`;
	missionFill.style.width = `${percent}%`;
	missionPercent.textContent = `${percent}% COMPLETADO`;
	missionTrack.setAttribute('aria-valuenow', String(completed));
	missionReset.disabled = completed === 0;
	missionSection.classList.toggle('is-complete', completed === missionInputs.length);
	missionStatus.textContent = nextMission === -1
		? 'Cuaderno completo. Ya puedes volver sobre tus notas.'
		: completed === 0
			? 'Empieza por leer la portada.'
			: `${completed} apunte${completed === 1 ? '' : 's'} completado${completed === 1 ? '' : 's'}. Siguiente: ${missionRows[nextMission].querySelector('.mission-text b').textContent}.`;

	missionRows.forEach((row, index) => {
		const isComplete = missionInputs[index].checked;
		const isNext = !isComplete && index === nextMission;
		row.classList.toggle('is-complete', isComplete);
		row.classList.toggle('is-next', isNext);
		row.querySelector('.mission-state').textContent = isComplete
			? 'COMPLETADA'
			: isNext ? 'SIGUIENTE' : 'PENDIENTE';
		row.querySelector('.mission-check').textContent = isComplete ? '✓' : isNext ? '↗' : '';
		missionStations[index].classList.toggle('is-complete', isComplete);
	});

	try {
		const checkedMissions = missionInputs
			.filter((input) => input.checked)
			.map((input) => Number(input.dataset.mission));
		localStorage.setItem(missionStorageKey, JSON.stringify(checkedMissions));
	} catch {
		missionStatus.textContent = `${completed} / ${missionInputs.length} apuntes marcados en esta sesión.`;
	}
}

missionInputs.forEach((input) => input.addEventListener('change', updateMissionProgress));
missionReset.addEventListener('click', () => {
	missionInputs.forEach((input) => { input.checked = false; });
	updateMissionProgress();
	missionInputs[0].focus();
});
updateMissionProgress();
