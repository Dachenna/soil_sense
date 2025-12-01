// Static data structure defining optimal pH ranges and base fertilizer needs
export const CROP_DATA = {
    "Corn": { name: "Corn / Maize", minPh: 6.0, maxPh: 7.5, baseFertilizer: "NPK 15-5-10 (High Nitrogen)", notes: "Corn requires significant Nitrogen (N) for rapid growth." },
    "Potatoes": { name: "Potatoes", minPh: 4.8, maxPh: 6.5, baseFertilizer: "NPK 8-10-15 (High Potassium)", notes: "Potatoes prefer slightly acidic soil and need high Potassium (K)." },
    "SweetPotato": { name: "Sweet Potato", minPh: 5.0, maxPh: 6.5, baseFertilizer: "Balanced NPK 10-10-10 with extra K", notes: "Tolerates slightly acidic soils; benefits from organic matter." },
    "Yam": { name: "Yam", minPh: 5.5, maxPh: 6.5, baseFertilizer: "NPK 10-10-10 (Balanced)", notes: "Yams prefer well-drained loamy soils and benefit from organic matter." },
    "Cassava": { name: "Cassava (Manioc)", minPh: 5.5, maxPh: 6.5, baseFertilizer: "NPK 10-10-20 (Higher K)", notes: "Drought-tolerant root crop; responds well to potassium applications." },
    "Rice": { name: "Rice", minPh: 5.5, maxPh: 7.0, baseFertilizer: "NPK 16-8-8 (Higher N)", notes: "Prefers flooded or well-watered conditions; needs steady N during tillering." },
    "Eggplant": { name: "Eggplant / Garden Egg", minPh: 5.5, maxPh: 6.8, baseFertilizer: "NPK 10-10-20 (Higher K)", notes: "Warm-season vegetable that benefits from phosphorus and potassium for fruiting." },
    "Carrot": { name: "Carrot", minPh: 6.0, maxPh: 6.8, baseFertilizer: "NPK 5-10-10 (Higher P & K)", notes: "Root crop that prefers loose, well-drained soils and adequate phosphorus for root development." },
    "Onion": { name: "Onion", minPh: 6.0, maxPh: 7.0, baseFertilizer: "NPK 10-10-10 (Balanced)", notes: "Bulb crops prefer neutral soils and regular nitrogen early in the season." },
    "Garlic": { name: "Garlic", minPh: 6.0, maxPh: 7.0, baseFertilizer: "NPK 8-10-10 (Balanced)", notes: "Similar needs to onions; avoids waterlogged soils." },
    "Pepper": { name: "Pepper (Bell/Chili)", minPh: 5.5, maxPh: 7.0, baseFertilizer: "NPK 5-10-10 (Higher P & K)", notes: "Peppers need phosphorus for flowering and potassium for fruit quality." },
    "Beans": { name: "Beans (Common)", minPh: 6.0, maxPh: 7.0, baseFertilizer: "Low N starter; focus on P & K (e.g., NPK 5-15-15)", notes: "Legumes fix their own nitrogen but benefit from phosphorus for root development." },
    "Soybean": { name: "Soybean", minPh: 6.0, maxPh: 7.0, baseFertilizer: "NPK 5-15-15 (Higher P & K)", notes: "Legume that fixes N; good phosphorus levels help nodulation." },
    "CarbohydratesGeneral": { name: "General Root/Tuber Crops", minPh: 5.5, maxPh: 6.5, baseFertilizer: "Balanced NPK with extra K", notes: "Root and tuber crops often prefer slightly acidic to neutral soils and good soil structure." },
    "Tomatoes": { name: "Tomatoes", minPh: 5.5, maxPh: 7.5, baseFertilizer: "NPK 5-10-10 (High Phosphorus & Potassium)", notes: "Tomatoes need P and K for flowering and fruiting." },
    "Cabbage": { name: "Cabbage / Broccoli", minPh: 6.0, maxPh: 7.5, baseFertilizer: "NPK 10-5-10 (Balanced/High Nitrogen)", notes: "Leafy greens prefer neutral soil." },
    "Blueberries": { name: "Blueberries", minPh: 4.0, maxPh: 5.5, baseFertilizer: "Acidic Fertilizer (e.g., Ammonium Sulfate)", notes: "Blueberries are highly acid-loving. Do not apply lime." },
    "Alfalfa": { name: "Alfalfa", minPh: 6.5, maxPh: 7.5, baseFertilizer: "NPK 0-20-20 (High Phosphorus & Potassium)", notes: "As a legume, it fixes its own Nitrogen (N)." },
    "General": { name: "General Vegetables", minPh: 6.0, maxPh: 7.0, baseFertilizer: "Balanced NPK 10-10-10", notes: "Most common vegetables do well in a neutral range." }
};
