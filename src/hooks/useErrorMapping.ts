const ErrorMessageMapping = {
  100: [
    "Try clicking confirm next time... virgin",
    "No wonder why you're still a virgin",
    "Once a virgin, always a virgin",
    "That's no way to get a laid",
    "No Lambos for you",
  ],
  200: [
    "Not sure how else to say this, but you're broke",
    "Brokie",
    "Try getting a job",
    "That's a little awkward",
    "Broke and a virgin, that's a tough combo",
    "Not enough cash... and that's not all you're lacking",
    "Try having more money next time",
    "No cash, no Lambos",
    "No cash, but looks like you don't get much of anything...",
  ],
};

enum ErrorContext {
  Unknown = 0,
  Purchase,
}

const errorMessages: Record<ErrorContext, Record<number, string[]>> = {
  [ErrorContext.Unknown]: {},
  [ErrorContext.Purchase]: ErrorMessageMapping,
};

export const useErrorMapping = (context: keyof typeof ErrorContext) => {
  const errors = errorMessages[ErrorContext[context]];

  const getError = (code: number) => {
    const messages = errors[code];
    if (!messages) return null;

    return messages[Math.floor(Math.random() * messages.length)];
  };

  return {
    getError,
  };
};
