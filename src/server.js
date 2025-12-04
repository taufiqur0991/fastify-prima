import { buildApp } from "./app.js";

async function startServer() {
  // PENTING: Gunakan 'await' karena buildApp sekarang adalah fungsi async
  const app = await buildApp(); 

  // Fastify merekomendasikan penggunaan promise-based listen() untuk error handling yang lebih baik
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer();