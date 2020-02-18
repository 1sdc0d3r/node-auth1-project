const dotenv = require("dotenv");
dotenv.config();
const server = require("./server/server");

const PORT = process.env.PORT || 8001;

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
