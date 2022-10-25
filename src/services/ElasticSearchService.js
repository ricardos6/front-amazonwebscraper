import { Buffer } from "buffer";

const APP_URL = "https://localhost:9200/riws_amazon_scraper";
const ELASTIC_USER = "elastic";
const ELASTIC_PASSWORD = "mueiriws22";

// Reference example, please remove it
export async function findAllFields(params) {
	const encodedCredentials = Buffer.from(
		`${ELASTIC_USER}:${ELASTIC_PASSWORD}`
	).toString("base64");

	return fetch(`${APP_URL}/_search`, {
		method: "POST", // POST, PUT, DELETE...
		// mode: "cors", // no-cors, *cors, same-origin
		// body: params,
		headers: new Headers({
			// Authorization: `Basic ${encodedCredentials}`,
			Authorization: "Basic ZWxhc3RpYzptdWVpcml3czIy",
			"Content-type": "application/json",
			// "Access-Control-Allow-Origin": "https://localhost:3000",
			// "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
			// "Access-Control-Allow-Headers":
			// 	"Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
		}),
		// headers: {
		// 	Authorization: `Basic ${encodedCredentials}`,
		// 	// "Content-Type": "application/json",
		// },
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			return res.data;
		});
}
