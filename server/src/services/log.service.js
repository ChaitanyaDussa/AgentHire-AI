import fs from "fs/promises";
import path from "path";
import { logsDir } from "../config/paths.js";
import { WorkflowLog } from "../models/WorkflowLog.js";

export async function logWorkflowEvent(entry) {
  const saved = await WorkflowLog.create(entry);
  const line = `${new Date().toISOString()} ${entry.workflow_id} ${entry.agent_name} ${entry.status} ${entry.error || ""}\n`;
  await fs.appendFile(path.join(logsDir, "workflow.log"), line);
  return saved;
}
