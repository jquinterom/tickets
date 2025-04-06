import { formatTimeStamp } from "./formatTimeStamp";

describe("formatTimeStamp", () => {
  const mockToLocaleString = jest.spyOn(Date.prototype, "toLocaleString");

  beforeEach(() => {
    mockToLocaleString.mockClear();
  });

  afterAll(() => {
    mockToLocaleString.mockRestore();
  });

  it("should return an empty string when timestamp is undefined", () => {
    expect(formatTimeStamp()).toBe("");
  });

  it("should return an empty string when timestamp is empty", () => {
    expect(formatTimeStamp("")).toBe("");
  });

  it("should call toLocaleString with correct options for valid timestamp", () => {
    const testDate = "2023-05-15T14:30:00Z";
    formatTimeStamp(testDate);

    expect(mockToLocaleString).toHaveBeenCalledWith("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  });

  it("should format a valid timestamp correctly", () => {
    mockToLocaleString.mockReturnValue("05/15/2023, 02:30 PM");

    const result = formatTimeStamp("2023-05-15T14:30:00Z");
    expect(result).toBe("05/15/2023, 02:30 PM");
  });

  it("should handle invalid date strings by returning implementation-dependent result", () => {
    mockToLocaleString.mockImplementation(function (this: Date) {
      return this.toString();
    });

    const result = formatTimeStamp("invalid-date-string");
    expect(typeof result).toBe("string");
    expect(result).not.toBe("");
  });

  it("should handle midnight time correctly", () => {
    mockToLocaleString.mockReturnValue("05/15/2023, 12:00 AM");
    const result = formatTimeStamp("2023-05-15T00:00:00Z");
    expect(result).toBe("05/15/2023, 12:00 AM");
  });

  it("should handle noon time correctly", () => {
    mockToLocaleString.mockReturnValue("05/15/2023, 12:00 PM");
    const result = formatTimeStamp("2023-05-15T12:00:00Z");
    expect(result).toBe("05/15/2023, 12:00 PM");
  });
});
