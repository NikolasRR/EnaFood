import app from "./app.js";

const server = app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));