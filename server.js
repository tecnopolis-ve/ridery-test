const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./src/config/config.js");
const apiRoutes = require("./src/routes/routes.js");

mongoose.connect(config.mongohost)

const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL
];

const PORT = config.port || 3000;
const app = express();

// init server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        credentials: true
    })
);

// redirect to default version
app.get("/", (req, res) => {
    res.redirect("/api/v1");
});

app.use("/api", apiRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Not Found" });
});

const startServer = (port) => {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server listening on http://localhost:${port} in '${config.env}' environment`);
    }).on("error", (err) => {
        console.error(err);
    });
};

startServer(PORT);