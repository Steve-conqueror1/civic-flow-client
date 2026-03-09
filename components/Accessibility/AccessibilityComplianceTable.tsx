import { Badge } from "@/components/ui/badge";

type ComplianceStatus = "compliant" | "partial";

interface ComplianceRow {
  section: string;
  status: ComplianceStatus;
  wcagLevel: string;
}

const ROWS: ComplianceRow[] = [
  { section: "Main Dashboard", status: "compliant", wcagLevel: "AA" },
  {
    section: "Reporting & Analytics",
    status: "partial",
    wcagLevel: "AA (In Progress)",
  },
  { section: "User Settings", status: "compliant", wcagLevel: "AA" },
  { section: "AI Assistant Interface", status: "compliant", wcagLevel: "AA" },
];

const StatusBadge = ({ status }: { status: ComplianceStatus }) => {
  if (status === "compliant") {
    return (
      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase text-xs font-bold hover:bg-green-100">
        Fully Compliant
      </Badge>
    );
  }
  return (
    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 uppercase text-xs font-bold hover:bg-blue-100">
      Partial
    </Badge>
  );
};

const AccessibilityComplianceTable = () => {
  return (
    <section
      aria-labelledby="compliance-heading"
      className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl"
    >
      <div className="bg-slate-50 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800">
        <h2
          id="compliance-heading"
          className="text-slate-900 dark:text-slate-100 text-xl font-bold"
        >
          Compliance Status
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/30">
              <th
                scope="col"
                className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Platform Section
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                WCAG 2.1 Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {ROWS.map((row) => (
              <tr key={row.section}>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">
                  {row.section}
                </td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                  {row.wcagLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export { AccessibilityComplianceTable };
export default AccessibilityComplianceTable;
