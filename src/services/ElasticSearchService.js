const APP_URL = "http://localhost:9200/riws_amazon_scraper";

// Reference example, please remove it
export async function findAllFields(params) {
	return fetch(`${APP_URL}/_search`, {
		method: "POST", // POST, PUT, DELETE...
		mode: "cors", // no-cors, *cors, same-origin
		body: JSON.stringify(params),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((res) => res);
}
