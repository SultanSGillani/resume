import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatDate, getDuration, profileLabel } from "../utils";
import type { ResumeWork, ResumeProfile } from "../types";

describe("formatDate", () => {
  it("returns 'Present' when no date is provided", () => {
    expect(formatDate(undefined)).toBe("Present");
  });

  it("formats a date string to short month and year", () => {
    expect(formatDate("2023-01-01")).toBe("Jan 2023");
  });

  it("formats a mid-year date correctly", () => {
    expect(formatDate("2021-06-15")).toBe("Jun 2021");
  });
});

describe("getDuration", () => {
  const baseJob: ResumeWork = {
    company: "Acme",
    position: "Engineer",
    website: "",
    startDate: "2020-01-01",
    summary: "",
    highlights: [],
  };

  it("returns duration in months only when less than a year", () => {
    const job: ResumeWork = { ...baseJob, startDate: "2023-01-01", endDate: "2023-06-01" };
    expect(getDuration(job)).toMatch(/mos$/);
  });

  it("returns duration in years only when no leftover months", () => {
    const job: ResumeWork = { ...baseJob, startDate: "2021-01-01", endDate: "2023-01-01" };
    expect(getDuration(job)).toBe("2 yrs");
  });

  it("returns years and months when there are leftover months", () => {
    const job: ResumeWork = { ...baseJob, startDate: "2020-01-01", endDate: "2022-07-01" };
    expect(getDuration(job)).toMatch(/\d yrs \d+ mos/);
  });

  it("uses current date when endDate is missing (current role)", () => {
    const fixedNow = new Date("2025-01-01").getTime();
    vi.spyOn(Date, "now").mockReturnValue(fixedNow);
    const job: ResumeWork = { ...baseJob, startDate: "2024-01-01" };
    expect(getDuration(job)).toBe("1 yrs");
    vi.restoreAllMocks();
  });

  it("returns at least 1 mos for very short durations", () => {
    const job: ResumeWork = { ...baseJob, startDate: "2023-01-01", endDate: "2023-01-02" };
    expect(getDuration(job)).toBe("1 mos");
  });
});

describe("profileLabel", () => {
  it("returns the network name when present", () => {
    const profile: ResumeProfile = { network: "GitHub", username: "sgillani", url: "" };
    expect(profileLabel(profile)).toBe("GitHub");
  });

  it("falls back to username when network is empty", () => {
    const profile: ResumeProfile = { network: "", username: "sgillani", url: "" };
    expect(profileLabel(profile)).toBe("sgillani");
  });
});
