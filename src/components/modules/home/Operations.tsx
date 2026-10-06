import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Truck,
  UserRound,
  Users,
} from "lucide-react";

const Operations = () => {
  return (
    <section
      id="operations"
      className="border-t border-border bg-secondary/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            One platform, three roles
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Everyone sees what
            <br />
            <span className="text-muted-foreground">
              they need to move faster.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            SwiftDrop gives merchants, riders, and administrators purpose-built
            workflows while keeping the entire delivery operation connected.
          </p>
        </div>

        {/* Role Cards */}
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          <OperationCard
            number="01"
            icon={UserRound}
            userRole="Merchant"
            title="Run your deliveries from one place."
            description="Create shipments, manage payments, monitor status, and keep your customers informed."
            features={[
              "Create & manage shipments",
              "Payment tracking",
              "Shipment status visibility",
              "Delivery history",
            ]}
          >
            <MerchantPreview />
          </OperationCard>

          <OperationCard
            number="02"
            icon={Truck}
            userRole="Rider"
            title="A clear workflow for every delivery."
            description="See assigned shipments, update delivery progress, and keep every handoff accountable."
            features={[
              "Assigned deliveries",
              "Pickup workflow",
              "Status updates",
              "Delivery completion",
            ]}
          >
            <RiderPreview />
          </OperationCard>

          <OperationCard
            number="03"
            icon={ShieldCheck}
            userRole="Admin"
            title="Keep the entire network under control."
            description="Manage users, riders, assignments, operations, and system activity from one command center."
            features={[
              "Rider management",
              "Shipment oversight",
              "Operational control",
              "Audit visibility",
            ]}
          >
            <AdminPreview />
          </OperationCard>
        </div>

        {/* Bottom Architecture Statement */}
        <div className="mt-16 overflow-hidden rounded-[2rem] border border-border bg-foreground text-background">
          <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
            <OperationMetric
              icon={ClipboardList}
              value="Shipments"
              description="Created and managed"
            />

            <Connector />

            <OperationMetric
              icon={Truck}
              value="Riders"
              description="Assigned and moving"
            />

            <Connector />

            <OperationMetric
              icon={BarChart3}
              value="Operations"
              description="Monitored centrally"
            />
          </div>

          <div className="border-t border-white/10 px-6 py-6 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold">
                  One connected delivery network.
                </p>

                <p className="mt-1 text-xs text-background/50">
                  Every role works from the same shipment lifecycle.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold">
                Built around real operations
                <CheckCircle2 className="size-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------- */
/* Operation Card                   */
/* -------------------------------- */

interface OperationCardProps {
  number: string;
  icon: React.ElementType;
  userRole: string;
  title: string;
  description: string;
  features: string[];
  children: React.ReactNode;
}

const OperationCard = ({
  number,
  icon: Icon,
  userRole,
  title,
  description,
  features,
  children,
}: OperationCardProps) => {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5">
      {/* Header */}
      <div className="p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
            {number} / {userRole.toUpperCase()}
          </span>

          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
            <Icon className="size-[18px]" />
          </div>
        </div>

        <h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em]">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        {/* Features */}
        <div className="mt-6 space-y-2.5">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2.5 text-xs"
            >
              <CheckCircle2 className="size-3.5 shrink-0 text-primary" />

              <span className="text-muted-foreground">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Preview */}
      <div className="border-t border-border bg-secondary/40 p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
};

/* -------------------------------- */
/* Merchant Preview                 */
/* -------------------------------- */

const MerchantPreview = () => {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-muted-foreground">
            Active shipments
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight">
            24
          </p>
        </div>

        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ClipboardList className="size-4" />
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-[72%] rounded-full bg-primary" />
      </div>

      <div className="mt-2 flex justify-between text-[9px] text-muted-foreground">
        <span>17 delivered</span>
        <span>7 active</span>
      </div>
    </div>
  );
};

/* -------------------------------- */
/* Rider Preview                    */
/* -------------------------------- */

const RiderPreview = () => {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-xs font-bold">
          RA
        </div>

        <div>
          <p className="text-xs font-semibold">Rahim Ahmed</p>

          <div className="mt-1 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />

            <span className="text-[9px] text-muted-foreground">
              Currently delivering
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-secondary/60 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground">
            Current shipment
          </span>

          <span className="text-[9px] font-semibold text-primary">
            SD-20481
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-background">
            <Truck className="size-3 text-primary" />
          </div>

          <div className="h-px flex-1 bg-border" />

          <div className="size-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- */
/* Admin Preview                    */
/* -------------------------------- */

const AdminPreview = () => {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="grid grid-cols-3 gap-2">
        <AdminMetric value="148" label="Shipments" />
        <AdminMetric value="32" label="Riders" />
        <AdminMetric value="96%" label="Success" />
      </div>

      <div className="mt-4 rounded-xl border border-border p-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="size-3.5" />
          </div>

          <div>
            <p className="text-[9px] font-semibold">
              Network status
            </p>

            <p className="text-[8px] text-muted-foreground">
              All systems operational
            </p>
          </div>

          <span className="ml-auto size-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- */
/* Admin Metric                     */
/* -------------------------------- */

interface AdminMetricProps {
  value: string;
  label: string;
}

const AdminMetric = ({ value, label }: AdminMetricProps) => {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <p className="text-sm font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-[8px] text-muted-foreground">
        {label}
      </p>
    </div>
  );
};

/* -------------------------------- */
/* Bottom Operation Metric          */
/* -------------------------------- */

interface OperationMetricProps {
  icon: React.ElementType;
  value: string;
  description: string;
}

const OperationMetric = ({
  icon: Icon,
  value,
  description,
}: OperationMetricProps) => {
  return (
    <div className="flex items-center gap-4 px-6 py-7 sm:px-8 lg:px-10">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
        <Icon className="size-5 text-primary" />
      </div>

      <div>
        <p className="text-sm font-semibold">
          {value}
        </p>

        <p className="mt-1 text-xs text-background/50">
          {description}
        </p>
      </div>
    </div>
  );
};

/* -------------------------------- */
/* Connector                        */
/* -------------------------------- */

const Connector = () => {
  return (
    <div className="hidden h-px bg-white/10 lg:block" />
  );
};

export default Operations;