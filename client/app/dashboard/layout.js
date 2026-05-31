import { Protected } from "../../components/Protected";
import { Shell } from "../../components/Shell";

export default function DashboardLayout({ children }) {
  return (
    <Protected>
      <Shell>{children}</Shell>
    </Protected>
  );
}
