const EMOJIS = ["💩", "👻", "🤖", "🐋", "🌍"]

export const formatSize = (size) => {
	const emoji = EMOJIS[size % EMOJIS.length]
	if (size < 1000) {
		return `${size} B`
	} else if (size < 1000 * 1000) {
		return `${Math.round(size / 100) / 10} kB`
	} else if (size < 1000 * 1000 * 1000) {
		return `${Math.round(size / (100 * 1000)) / 10} MB`
	} else if (size < 1000 * 1000 * 1000 * 1000) {
		return `${Math.round(size / (100 * 1000 * 1000)) / 10} GB`
	} else if (size < 1000 * 1000 * 1000 * 1000 * 1000) {
		return `${emoji} TB`
	} else {
		return `${emoji} PB`
	}
}
