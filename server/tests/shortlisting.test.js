import { shortlistingAgent } from "../src/agents/shortlisting.agent.js";

describe("shortlistingAgent", () => {
  test("uses spec thresholds to shortlist a high score", async () => {
    const result = await shortlistingAgent({
      matchingResult: { data: { match_score: 85 } }
    });

    expect(result.data.status).toBe("shortlisted");
  });

  test("uses spec thresholds to hold a mid score", async () => {
    const result = await shortlistingAgent({
      matchingResult: { data: { match_score: 65 } }
    });

    expect(result.data.status).toBe("hold");
  });
});
