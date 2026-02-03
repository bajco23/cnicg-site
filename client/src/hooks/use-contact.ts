import { useMutation } from "@tanstack/react-query";
import { api, type ContactCreateInput } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: async (payload: ContactCreateInput) => {
      const validated = api.contact.create.input.parse(payload);

      const res = await apiRequest(api.contact.create.method, api.contact.create.path, validated);

      if (res.status === 201) {
        const json = await res.json();
        return api.contact.create.responses[201].parse(json);
      }

      // apiRequest throws for non-OK, but keep defensive parsing for completeness
      if (res.status === 400) {
        const json = await res.json();
        const err = api.contact.create.responses[400].parse(json);
        throw new Error(err.message);
      }
      if (res.status === 500) {
        const json = await res.json();
        const err = api.contact.create.responses[500].parse(json);
        throw new Error(err.message);
      }

      throw new Error("Unexpected response");
    },
  });
}
