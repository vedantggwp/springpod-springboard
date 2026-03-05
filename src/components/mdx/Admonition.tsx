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
    gradient: "from-[#9CF6F6]/30 to-[#0BB3B7]/10",
    darkGradient: "dark:from-[#9CF6F6]/10 dark:to-[#0BB3B7]/5",
    border: "border-[#0BB3B7]",
    iconColor: "text-[#0BB3B7]",
    defaultTitle: "Info",
  },
  note: {
    icon: Info,
    gradient: "from-[#9CF6F6]/30 to-[#0BB3B7]/10",
    darkGradient: "dark:from-[#9CF6F6]/10 dark:to-[#0BB3B7]/5",
    border: "border-[#0BB3B7]",
    iconColor: "text-[#0BB3B7]",
    defaultTitle: "Note",
  },
  warning: {
    icon: AlertCircle,
    gradient: "from-[#FF475A]/10 to-[#FF475A]/5",
    darkGradient: "dark:from-[#FF475A]/8 dark:to-[#FF475A]/3",
    border: "border-[#FF475A]",
    iconColor: "text-[#FF475A]",
    defaultTitle: "Warning",
  },
  danger: {
    icon: AlertCircle,
    gradient: "from-[#FF475A]/10 to-[#FF475A]/5",
    darkGradient: "dark:from-[#FF475A]/8 dark:to-[#FF475A]/3",
    border: "border-[#FF475A]",
    iconColor: "text-[#FF475A]",
    defaultTitle: "Danger",
  },
  tip: {
    icon: CheckCircle2,
    gradient: "from-[#0BB3B7]/10 to-[#9CF6F6]/20",
    darkGradient: "dark:from-[#0BB3B7]/8 dark:to-[#9CF6F6]/5",
    border: "border-[#0BB3B7]",
    iconColor: "text-[#0BB3B7]",
    defaultTitle: "Tip",
  },
  success: {
    icon: CheckCircle2,
    gradient: "from-[#0BB3B7]/10 to-[#9CF6F6]/20",
    darkGradient: "dark:from-[#0BB3B7]/8 dark:to-[#9CF6F6]/5",
    border: "border-[#0BB3B7]",
    iconColor: "text-[#0BB3B7]",
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
          <p className="mb-1 font-medium text-[#16254C] dark:text-white">
            {title ?? config.defaultTitle}
          </p>
          <div className="text-sm text-[#2D3B5E] dark:text-white/70">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
