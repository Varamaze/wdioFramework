import request from "supertest";

async function GET(baseURL: string, endpoint: string, authToken: string, queryParams: object) {
    if(!baseURL || !endpoint) throw Error(`Invalid baseURL or Endpoint.`)
    try {
        return await request(baseURL)
        .get(endpoint)
        .auth(authToken, { type: "bearer" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .query(queryParams)

    }catch(err){
        err.message = `GET request to ${baseURL}${endpoint} failed. ${err.message}`
        throw err
    }
    
}

async function POST(baseURL: string, endpoint: string, authToken: string, payload: object) {
    if(!baseURL || !endpoint) throw Error(`Invalid baseURL or Endpoint.`)
    try {
        return await request(baseURL)
        .post(endpoint)
        .auth(authToken, { type: "bearer" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json, text/plain, */*")
        // .set("authority", "api.rudderstack.com")
        // .set("origin", "https://app.rudderstack.com")
        // .set("referer", "https://app.rudderstack.com/")
        // .set("Host", "api.rudderstack.com")
        .send(payload)

    }catch(err){
        err.message = `POST request to ${baseURL}${endpoint} failed. ${err.message}`
        throw err
    }
}

export default {GET, POST}
