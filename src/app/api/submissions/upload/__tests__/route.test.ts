import { vi } from "vitest";
import { POST as uploadFile } from "../route";
import { put, PutBlobResult } from "@vercel/blob";

const MockRequest = (path: string, body?: BodyInit | null | undefined) => {
  const url = new URL(path, "https://example.com");
  return new Request(url, {
    method: "POST",
    body,
  });
};

vi.mock("@vercel/blob");

describe("POST /api/submissions/upload", () => {
  it("should return a 400 if no filename is provided", async () => {
    const request = MockRequest("/api/submissions/upload");

    const response = await uploadFile(request);
    // Don't store the file
    expect(vi.mocked(put)).not.toHaveBeenCalled();

    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result).toEqual({ error: "No filename provided" });
  });

  it("should return a 400 if no file contents are provided", async () => {
    const request = MockRequest("/api/submissions/upload?filename=test.txt");

    const response = await uploadFile(request);
    // Don't store the file
    expect(vi.mocked(put)).not.toHaveBeenCalled();

    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result).toEqual({ error: "No file contents" });
  });

  it("should return a 200 with the uploaded file", async () => {
    const mockedPut = vi.mocked(put).mockResolvedValue({
      filename: "test.txt",
      access: "public",
    } as unknown as PutBlobResult);

    const request = MockRequest(
      "/api/submissions/upload?filename=test.txt",
      "Hello, world!"
    );

    const response = await uploadFile(request);

    expect(mockedPut).toHaveBeenCalledWith("test.txt", expect.anything(), {
      access: "public",
    });

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result).toEqual({
      filename: "test.txt",
      access: "public",
    });
  });
});
