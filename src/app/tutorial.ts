namespace Tutorial {

	const tutorialVersion = 4;
	export let tutorialVisible = false;

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

	export function resetVisibility() {
		console.log('resetting visibility')
		localStorage.setItem('tutorialPassed', '0');
		tutorialVisible = true;
	}
}

export default Tutorial;
