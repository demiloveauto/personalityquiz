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