const baseURL = import.meta.env.DEV
  ? "/caar.api"
  : "https://app.hillsboroughcounty.org/CAAR/Abuser";

export async function get<T>(path = ""): Promise<T> {
  const response = await fetch(`${baseURL}${path}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data as T;
}
