import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    required_skills: [{ type: String }],
    preferred_skills: [{ type: String }],
    min_experience: { type: Number, default: 0 },
    workflow_spec_id: { type: String, default: "workflow/default-hiring-workflow.json" },
    hiring_spec_id: { type: String, default: "hiring/frontend-developer.json" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Job = mongoose.model("Job", jobSchema);
