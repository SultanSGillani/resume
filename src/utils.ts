import type { ResumeProfile, ResumeWork } from "./types";

export function formatDate(dateValue?: string): string {
  if (!dateValue) {
    return "Present";
  }

  return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function getDuration(item: ResumeWork): string {
  const start = new Date(`${item.startDate}T00:00:00`).getTime();
  const end = item.endDate
    ? new Date(`${item.endDate}T00:00:00`).getTime()
    : Date.now();

  const months = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24 * 30.4)));
  const years = Math.floor(months / 12);
  const remainMonths = months % 12;

  if (years === 0) {
    return `${months} mos`;
  }

  if (remainMonths === 0) {
    return `${years} yrs`;
  }

  return `${years} yrs ${remainMonths} mos`;
}

export function profileLabel(profile: ResumeProfile): string {
  return profile.network || profile.username;
}
