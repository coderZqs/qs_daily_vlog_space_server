import request from "supertest"
import { Server } from "http"
import run from "../app"

describe("http", () => {
    let server: Server;
    beforeAll((): Server => {
        run(88);
    })
    it("Get /admin", () => {
        return request(server).get("/admin").expect(200)
    })
})