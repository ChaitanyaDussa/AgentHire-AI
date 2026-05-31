import { WorkflowGraph } from "../../../features/workflows/WorkflowGraph";

export default function WorkflowsPage() {
  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-black">Workflow Monitoring</h1>
      <WorkflowGraph currentState="human_approval" status="waiting_approval" />
    </div>
  );
}
