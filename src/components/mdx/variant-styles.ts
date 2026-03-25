export interface VariantColors {
  readonly bg: string;
  readonly border: string;
  readonly accentColor: string;
}

export const tealVariant: VariantColors = {
  bg: "bg-sp-teal/[0.04] dark:bg-sp-teal/[0.06]",
  border: "border-sp-teal",
  accentColor: "text-sp-teal",
};

export const redVariant: VariantColors = {
  bg: "bg-sp-red/[0.04] dark:bg-sp-red/[0.06]",
  border: "border-sp-red",
  accentColor: "text-sp-red",
};

export const blueVariant: VariantColors = {
  bg: "bg-sp-blue/[0.04] dark:bg-sp-blue/[0.06]",
  border: "border-sp-blue",
  accentColor: "text-sp-blue",
};
