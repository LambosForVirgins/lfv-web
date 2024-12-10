import { vi } from "vitest";
import { POST as enterDrawId } from "./route";
import { put, PutBlobResult } from "@vercel/blob";
import { NextRequest } from "next/server";

const MockRequest = (
  path: string,
  body: BodyInit | object | null | undefined = {}
): NextRequest => {
  const url = new URL(path, "https://example.com");
  return new NextRequest(url, {
    method: "POST",
    body: JSON.stringify(body || {}),
  });
};

vi.mock("@vercel/blob");

describe("POST /api/submission/upload", () => {
  it("should return a 400 when account balance is insufficient", async () => {
    const request = MockRequest("/api/draw/123/enter");

    const response = await enterDrawId(request, { params: { drawId: "123" } });
    // Don't store the file
    expect(vi.mocked(put)).not.toHaveBeenCalled();

    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result).toEqual({ error: "No filename provided" });
  });

  it("should return a 400 if draw not found", async () => {
    const request = MockRequest("/api/draw/123/enter");

    const response = await enterDrawId(request, { params: { drawId: "123" } });
    // Don't store the file
    expect(vi.mocked(put)).not.toHaveBeenCalled();

    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result).toEqual({ error: "No file contents" });
  });

  it.todo("should return a 400 if draw not open");

  it.todo("should return a 400 if address not provided");

  it.todo("should return a 400 if draw already entered");

  it.todo("should return a 400 if name is not provided");

  it("should return a 200 with the entry record", async () => {
    const mockedPut = vi.mocked(put).mockResolvedValue({
      filename: "123.txt",
      access: "public",
    } as unknown as PutBlobResult);

    const request = MockRequest("/api/draw/123/enter", JSON.stringify({}));

    const response = await enterDrawId(request, { params: { drawId: "123" } });

    expect(mockedPut).toHaveBeenCalledWith("123.txt", expect.anything(), {
      access: "public",
    });

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result).toEqual({
      filename: "123.txt",
      access: "public",
    });
  });
});
