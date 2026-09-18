export const orderQueryKeys = {
  all: ["orders"] as const,

  list: () => [...orderQueryKeys.all, "list"] as const,

  detail: (id: string) => [...orderQueryKeys.all, "detail", id] as const,

  activities: (id: string) =>
    [...orderQueryKeys.all, "activities", id] as const,
};
