export function NewLine(text: String): String {
	let newText = ``;
	text.split("\n").map((txt) => (newText += txt + `<br />`));
	return newText;
}
