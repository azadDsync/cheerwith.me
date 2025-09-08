import { useQuery } from "@tanstack/react-query";

export function useApiData() {
  return useQuery({
    queryKey: ["apiData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8787/data");
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    },
  });
}

// "https://server-cheerwithme.domendra-contact.workers.dev/data";
//   "http://localhost:8787/data";
