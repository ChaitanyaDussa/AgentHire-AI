"use client";

import { useMemo } from "react";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const states = ["resume_parser", "embedding_agent", "matching_agent", "shortlisting_agent", "human_approval", "interview_agent", "email_agent"];

const colors = {
  running: "#2563eb",
  success: "#16a34a",
  failed: "#dc2626",
  waiting_approval: "#ca8a04",
  pending: "#94a3b8"
};

export function WorkflowGraph({ currentState = "matching_agent", status = "running" }) {
  const elements = useMemo(() => {
    const nodes = states.map((state, index) => {
      const stateStatus = state === currentState ? status : states.indexOf(currentState) > index ? "success" : "pending";
      return {
        id: state,
        data: { label: state.replaceAll("_", " ") },
        position: { x: index * 190, y: index % 2 ? 80 : 0 },
        style: { border: `2px solid ${colors[stateStatus]}`, borderRadius: 8, padding: 10, width: 150 }
      };
    });
    const edges = states.slice(0, -1).map((state, index) => ({
      id: `${state}-${states[index + 1]}`,
      source: state,
      target: states[index + 1],
      animated: states[index + 1] === currentState
    }));
    return { nodes, edges };
  }, [currentState, status]);

  return (
    <div className="panel h-[420px] overflow-hidden">
      <ReactFlow nodes={elements.nodes} edges={elements.edges} fitView />
    </div>
  );
}
