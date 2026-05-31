import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema(
  {
    candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    current_state: { type: String, default: "created" },
    status: { type: String, default: "running" },
    retries: { type: Map, of: Number, default: {} },
    state: { type: Object, default: {} }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Workflow = mongoose.model("Workflow", workflowSchema);
