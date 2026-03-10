import {
  Info,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

type AdmonitionType = "note" | "warning" | "tip" | "info" | "danger" | "success";

interface AdmonitionProps {
  readonly type: AdmonitionType;
  readonly title?: string;
  readonly children: React.ReactNode;
}

interface AdmonitionStyle {
  readonly icon: LucideIcon;
  readonly gradient: string;
  readonly darkGradient: string;
  readonly border: string;
  readonly iconColor: string;
  readonly defaultTitle: string;
}

const admonitionConfig: Record<AdmonitionType, AdmonitionStyle> = {
  info: {
    icon: Info,
    gradient: "from-sp-teal-light/30 to-sp-teal/10",
    darkGradient: "dark:from-sp-teal-light/10 dark:to-sp-teal/5",
    border: "border-sp-teal",
    iconColor: "text-sp-teal",
    defaultTitle: "Info",
  },
  note: {
    icon: Info,
    gradient: "from-sp-teal-light/30 to-sp-teal/10",
    darkGradient: "dark:from-sp-teal-light/10 dark:to-sp-teal/5",
    border: "border-sp-teal",
    iconColor: "text-sp-teal",
    defaultTitle: "Note",
  },
  warning: {
    icon: AlertCircle,
    gradient: "from-sp-red/10 to-sp-red/5",
    darkGradient: "dark:from-sp-red/8 dark:to-sp-red/3",
    border: "border-sp-red",
    iconColor: "text-sp-red",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertCircle,
    gradient: "from-sp-red/10 to-sp-red/5",
    darkGradient: "dark:from-sp-red/8 dark:to-sp-red/3",
    border: "border-sp-red",
    iconColor: "text-sp-red",
    defaultTitle: "Danger",
  },
  tip: {
    icon: CheckCircle2,
    gradient: "from-sp-teal/10 to-sp-teal-light/20",
    darkGradient: "dark:from-sp-teal/8 dark:to-sp-teal-light/5",
    border: "border-sp-teal",
    iconColor: "text-sp-teal",
    defaultTitle: "Tip",
  },
  success: {
    icon: CheckCircle2,
    gradient: "from-sp-teal/10 to-sp-teal-light/20",
    darkGradient: "dark:from-sp-teal/8 dark:to-sp-teal-light/5",
    border: "border-sp-teal",
    iconColor: "text-sp-teal",
    defaultTitle: "Success",
  },
};

export default function Admonition({
  type,
  title,
  children,
}: AdmonitionProps) {
  const config = admonitionConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={[
        "my-4 rounded-xl border-l-4 bg-gradient-to-r p-6",
        config.gradient,
        config.darkGradient,
        config.border,
      ].join(" ")}
      role="note"
    >
      <div className="flex gap-3">
        <Icon size={20} className={`${config.iconColor} mt-0.5 shrink-0`} />
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-medium text-sp-navy dark:text-white">
            {title ?? config.defaultTitle}
          </p>
          <div className="text-sm text-sp-navy-light dark:text-white/70">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
