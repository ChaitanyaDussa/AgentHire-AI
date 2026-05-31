import mongoose from "mongoose";

const workflowLogSchema = new mongoose.Schema(
  {
    workflow_id: { type: mongoose.Schema.Types.ObjectId, ref: "Workflow", required: true },
    agent_name: { type: String, required: true },
    input: { type: Object, default: {} },
    output: { type: Object, default: {} },
    status: { type: String, required: true },
    error: { type: String, default: "" }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const WorkflowLog = mongoose.model("WorkflowLog", workflowLogSchema);
