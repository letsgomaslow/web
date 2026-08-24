import { render, screen } from "@testing-library/react";
import { getPressRelease } from "@/lib/content/press";
import { PressReleaseBody } from "./PressReleaseBody";

describe("PressReleaseBody", () => {
  it("renders approved sections with semantic links and contact details", () => {
    const release = getPressRelease("openai-select-partner");
    render(<PressReleaseBody sections={release!.sections} />);

    expect(
      screen.getByRole("heading", { name: "Production evidence" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Infinite AI OS: an AI operating system in 90 days",
      }),
    ).toHaveAttribute("href", "/case-studies/infinite-ai-os");
    expect(
      screen.getByRole("link", {
        name: "AgentHub: contracts you can question",
      }),
    ).toHaveAttribute("href", "/case-studies/agenthub");
    expect(
      screen.getByRole("link", {
        name: "https://openai.com/business/partners/",
      }),
    ).toHaveAttribute("target", "_blank");
    expect(
      screen.getByRole("heading", { name: "Media contact" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "rakesh@maslow.ai" }),
    ).toHaveAttribute("href", "mailto:rakesh@maslow.ai");
  });
});
