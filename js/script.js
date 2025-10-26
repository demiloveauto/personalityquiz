console.log("script.js connected!");


const answers = {};

function initQuizButtons() {
	
	const blocks = document.querySelectorAll('.question-block');
	blocks.forEach((block) => {
		
		const buttons = block.querySelectorAll('.answer-btn');
		buttons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				
				buttons.forEach((b) => b.classList.remove('selected'));

				
				btn.classList.add('selected');

				
				const q = btn.getAttribute('data-question') || btn.closest('[id]')?.id || null;
				const answer = btn.getAttribute('data-answer');
				const points = Number(btn.getAttribute('data-points')) || 0;

				if (q) {
					answers[q] = { answer, points };
				}

				console.log('Selected answer', { question: q, answer, points });
				console.log('Current answers map:', answers);
			});
		});
	});
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initQuizButtons);
} else {
	initQuizButtons();
}

window.__quizAnswers = answers;

function displayResult() {
	
	const entries = Object.values(answers);
	if (entries.length === 0) {
		alert('Please answer at least one question before viewing results.');
		return;
	}

	
	const total = entries.reduce((sum, a) => sum + (a.points || 0), 0);
	console.log('Total points:', total);

	
	let outcomeKey = '';
	if (total >= 13) outcomeKey = 'Leader'; // 13-16
	else if (total >= 10) outcomeKey = 'Genius'; // 10-12
	else if (total >= 7) outcomeKey = 'Rebel'; // 7-9
	else outcomeKey = 'Protector'; // 4-6

	
	const outcomes = {
		Leader: {
			title: 'The Leader',
			desc: 'Bold and inspiring — you take charge when it matters and rally others to your cause.'
		},
		Genius: {
			title: 'The Genius',
			desc: 'Inventive and analytical — you solve problems with creativity and smarts.'
		},
		Rebel: {
			title: 'The Rebel',
			desc: 'Independent and daring — you follow your own rules and act boldly.'
		},
		Protector: {
			title: 'The Protector',
			desc: 'Compassionate and steady — you prioritize safety and support for others.'
		}
	};

	const res = outcomes[outcomeKey];

	
	const container = document.getElementById('result-container');
	const textEl = document.getElementById('result-text');
	if (container && textEl) {
		textEl.innerHTML = `<strong>${res.title}</strong><br>${res.desc}<br><small>Total points: ${total}</small>`;
		container.style.display = 'block';
		
		container.scrollIntoView({ behavior: 'smooth' });
	} else {
		console.log('Result:', res.title, res.desc);
	}
}


const showBtn = document.getElementById('show-result');
if (showBtn) {
	showBtn.addEventListener('click', displayResult);
} else {
	
	document.addEventListener('DOMContentLoaded', () => {
		const btn = document.getElementById('show-result');
		if (btn) btn.addEventListener('click', displayResult);
	});
}