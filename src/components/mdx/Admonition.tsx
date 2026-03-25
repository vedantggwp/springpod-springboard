import {
  Info,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { tealVariant, redVariant } from "./variant-styles";

type AdmonitionType = "note" | "warning" | "tip" | "info" | "danger" | "success";

interface AdmonitionProps {
  readonly type: AdmonitionType;
  readonly title?: string;
  readonly children: React.ReactNode;
}

interface AdmonitionStyle {
  readonly icon: LucideIcon;
  readonly bg: string;
  readonly border: string;
  readonly iconColor: string;
  readonly defaultTitle: string;
}

const admonitionConfig: Record<AdmonitionType, AdmonitionStyle> = {
  info: { icon: Info, ...tealVariant, iconColor: tealVariant.accentColor, defaultTitle: "Info" },
  note: { icon: Info, ...tealVariant, iconColor: tealVariant.accentColor, defaultTitle: "Note" },
  warning: { icon: AlertCircle, ...redVariant, iconColor: redVariant.accentColor, defaultTitle: "Warning" },
  danger: { icon: AlertCircle, ...redVariant, iconColor: redVariant.accentColor, defaultTitle: "Danger" },
  tip: { icon: CheckCircle2, ...tealVariant, iconColor: tealVariant.accentColor, defaultTitle: "Tip" },
  success: { icon: CheckCircle2, ...tealVariant, iconColor: tealVariant.accentColor, defaultTitle: "Success" },
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
        "my-4 rounded-lg border-l-4 p-6",
        config.bg,
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
