const APP_URL = "http://localhost:9200/riws_amazon_scraper";

// Reference example, please remove it
export async function findAllFields(params) {
	return fetch(`${APP_URL}/_search`, {
		method: "POST", // POST, PUT, DELETE...
		mode: "cors", // no-cors, *cors, same-origin
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			return res.data;
		});
}
