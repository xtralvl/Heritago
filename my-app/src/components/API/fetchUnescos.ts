// ✅ Fetch all UNESCO sites located in the USA
export async function fetchUsaUnescos() {
  try {
    const response = await fetch("/data/unescos.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // if the JSON structure is { data: [...] }, make sure to use data.data
    const records = Array.isArray(data) ? data : data.data;

    const usaSites = records.filter(
      (record: any) =>
        record.states_names?.includes("United States of America") ||
        record.iso_codes?.includes("US")
    );

    console.log(usaSites)

    return usaSites;
  } catch (error) {
    console.error("Error fetching local JSON:", error);
    return [];
  }
};

export async function fetchTopUnescos() {
  try {
    const response = await fetch("/data/unescos.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    const records = Array.isArray(data) ? data : data.data;

    const topSites = records.filter(
      (site: any) =>
        site.uuid === "6df400bc-6232-523e-ba1b-2dc139b5dfee" ||
        site.uuid === "0203019f-3eb1-5dd5-b326-f3ab75306dd4" ||
        site.uuid === "3fa9ca1b-59a1-5000-9062-0a27be052a4e" ||
        site.uuid === "4848944a-5236-5638-adb8-3d274de29cb4" ||
        site.uuid === "392379ca-5ccf-5283-a086-5d99bca4109c" ||
        site.uuid === "8f1666c3-8827-5e26-a907-84e47324adf5"
    );
    console.log(topSites)

    return topSites;
  } catch (error) {
    console.error("Error fetching top UNESCO sites:", error);
    return [];
  }
};
