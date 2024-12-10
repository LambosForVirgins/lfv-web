export const getCreditBalance = async (): Promise<{
  balance: number;
  pending: number;
}> => {
  return fetch("/api/credit")
    .then((res) => res.json())
    .then((data) => {
      return {
        balance: data.balance ?? 0,
        pending: 0,
      };
    });
};
