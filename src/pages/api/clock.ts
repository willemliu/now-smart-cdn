import Cors from "micro-cors";
const cors = Cors({ allowMethods: ["GET", "HEAD"] });

function getRoutes(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ date: new Date() }));
}

export default cors(getRoutes);
