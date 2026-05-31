import fs from "fs/promises";
import path from "path";
import { specsDir } from "../config/paths.js";

const cache = new Map();

export async function loadSpec(relativePath) {
  const fullPath = path.resolve(specsDir, relativePath);
  if (!fullPath.startsWith(specsDir)) {
    throw new Error("Invalid spec path");
  }

  if (!cache.has(fullPath)) {
    const raw = await fs.readFile(fullPath, "utf8");
    cache.set(fullPath, JSON.parse(raw));
  }

  return cache.get(fullPath);
}
