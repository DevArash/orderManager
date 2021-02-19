/*
 * The module to check and analyze the client's request to the server 
*/

// External Imports
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

// Utilities imports
import { throwError } from "./throwError.ts"
import {body, bodyAdditional} from "../schemas/clientRequest.ts"

const v = new FastestValidator();
const check = v.compile({
	wants: {
		type: "object",
		props: {
			model: {
				type: "enum",
				values: [
					"Testing",
					"Center",
					
				],
			},
		},
	},
});


export const requestParser = async (req: ServerRequest) => {
    req.headers.get("content-type") !== "application/json" ? throwError(`You request's details do no match`) : null

    const decoder = new TextDecoder()
    const body = await Deno.readAll(req.body)
    const decodedBody = decoder.decode(body);
	const parsedBody: body = JSON.parse(decodedBody);
	const parsedBodyAdditional: bodyAdditional = {
		// make extrabody from parsedBody to add context to it
		...parsedBody,
		context: {
			token: req.headers.get("token"),
		},
	}

	// The function to analyze the request's body by `FastestValidator`
	const checkRequestBody = (body: bodyAdditional) => {
		const isRequestValid = check(body)

		return isRequestValid === true
		? isRequestValid
		: throwError(`${isRequestValid[0].message} But  => ${isRequestValid[0].actual} <= is received`)
	}

	return req.method === "POST" &&
	req.url === "/funql" &&
	checkRequestBody(parsedBodyAdditional)
	? parsedBodyAdditional
	: throwError(``)
}