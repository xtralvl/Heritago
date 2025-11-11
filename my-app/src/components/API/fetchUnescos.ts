export async function fetchUsaUnescos() {
  try {
    const response = await fetch("/data/unescos.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    const usaSites = data.filter(
      (record: any) =>
        record.states_names?.includes("United States of America") ||
        record.iso_codes?.includes("US")
    );

    return usaSites;
  } catch (error) {
    console.error("Error fetching local JSON:", error);
    return [];
  }
}
