export const getMemos = () => {
	return fetch('/getAll')
		.then(res => res.json())
		.catch((err) => console.log(err));
};

export const createMemo = (description, audioUrl) => {
	return fetch('/add', {
		method: 'POST',
		headers: {
			'Accept' : 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			description: description,
			audioUrl: audioUrl,
			date: new Date().toLocaleDateString()
		})
	})
		.then((res) => {
			return res.json();
		});
};
