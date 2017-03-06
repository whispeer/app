namespace Tutorial {

	const tutorialVersion = 2;
	export let tutorialVisible = true;

	export function skip() {
		tutorialVisible = false;
		localStorage.setItem(
			'tutorialPassed',
			`${tutorialVersion}`
		);
	}

	export function checkVisibility() {
		const passedVersion = parseInt(localStorage.getItem('tutorialPassed'), 10)
		tutorialVisible = isNaN(passedVersion) || (passedVersion < tutorialVersion)
	}
}

export default Tutorial;
