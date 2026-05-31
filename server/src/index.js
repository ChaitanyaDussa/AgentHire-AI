import dotenv from "dotenv";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = createApp();

await connectDatabase();

app.listen(port, () => {
  console.log(`Recruitment API running on http://localhost:${port}`);
});
