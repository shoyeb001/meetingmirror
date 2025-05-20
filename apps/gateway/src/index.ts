import config from "./config/config";
import httpProxy from "express-http-proxy"
import express from "express";

const app = express();

app.use("/auth", httpProxy(config.AUTH_SERVICE_URL))
app.use("/meeting", httpProxy(config.MEETING_SERVICE_URL))


app.listen(config.PORT, () => {
    console.log(`Gateway server running on PORT ${8000}`)
})