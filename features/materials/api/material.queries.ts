export const materialQueryKeys = {
  all: ["materials"] as const,

  list: () => [...materialQueryKeys.all, "list"] as const,
};
