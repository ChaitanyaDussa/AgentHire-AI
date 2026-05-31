import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const rootDir = path.resolve(dirname, "../../..");
export const serverDir = path.resolve(rootDir, "server");
export const specsDir = path.resolve(rootDir, "specs");
export const uploadsDir = path.resolve(serverDir, "uploads");
export const logsDir = path.resolve(serverDir, "logs");
