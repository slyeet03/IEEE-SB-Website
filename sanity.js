import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "gcb0j4e6",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});