import server from "./server"; // Eliminada la extensión .js

server.listen(4000, () => {
    console.log("Server is running on port 4000");
})