// Static data structure defining optimal pH ranges and base fertilizer needs
export const CROP_DATA = {
    "Corn": { name: "Corn / Maize", minPh: 6.0, maxPh: 7.5, baseFertilizer: "NPK 15-5-10 (High Nitrogen)", notes: "Corn requires significant Nitrogen (N) for rapid growth." },
    "Potatoes": { name: "Potatoes", minPh: 4.8, maxPh: 6.5, baseFertilizer: "NPK 8-10-15 (High Potassium)", notes: "Potatoes prefer slightly acidic soil and need high Potassium (K)." },
    "Blueberries": { name: "Blueberries", minPh: 4.0, maxPh: 5.5, baseFertilizer: "Acidic Fertilizer (e.g., Ammonium Sulfate)", notes: "Blueberries are highly acid-loving. Do not apply lime." },
    "Alfalfa": { name: "Alfalfa", minPh: 6.5, maxPh: 7.5, baseFertilizer: "NPK 0-20-20 (High Phosphorus & Potassium)", notes: "As a legume, it fixes its own Nitrogen (N)." },
    "Cabbage": { name: "Cabbage / Broccoli", minPh: 6.0, maxPh: 7.5, baseFertilizer: "NPK 10-5-10 (Balanced/High Nitrogen)", notes: "Leafy greens prefer neutral soil." },
    "Tomatoes": { name: "Tomatoes", minPh: 5.5, maxPh: 7.5, baseFertilizer: "NPK 5-10-10 (High Phosphorus & Potassium)", notes: "Tomatoes need P and K for flowering and fruiting." },
    "General": { name: "General Vegetables", minPh: 6.0, maxPh: 7.0, baseFertilizer: "Balanced NPK 10-10-10", notes: "Most common vegetables do well in a neutral range." }
};
