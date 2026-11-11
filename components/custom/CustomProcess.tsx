import type { ProcessStep } from "@/data/types";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";

/** The five-step custom sticker workflow shown on /custom and /custom/request. */
export const customProcess: ProcessStep[] = [
  {
    id: "01",
    title: "Tell me your idea",
    body: "Send the brief form. A place, a memory, a photo of the thing you want drawn — rough is completely fine.",
  },
  {
    id: "02",
    title: "I sketch the concept",
    body: "You get a rough drawing within a few days to react to. Nothing is locked until you say so.",
  },
  {
    id: "03",
    title: "Final artwork",
    body: "The illustration is finished in the same hand as the shop library, so it sits comfortably beside the rest.",
  },
  {
    id: "04",
    title: "Proof & approve",
    body: "You see the print-ready proof, including size and finish. Unlimited tweaks within the agreed scope.",
  },
  {
    id: "05",
    title: "Printed & delivered",
    body: "Stickers are die-cut, quality-checked one by one, and shipped flat in a rigid mailer.",
  },
];

type Props = {
  steps?: ProcessStep[];
  tone?: "light" | "dark";
  className?: string;
};

export function CustomProcess({ steps = customProcess, tone = "light", className }: Props) {
  return <ProcessSteps steps={steps} tone={tone} className={className} />;
}