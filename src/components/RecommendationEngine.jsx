import React, { useState, useEffect } from 'react';
import { CROP_DATA } from '../cropData';
import SOIL_TYPES from '../soilType';
import Icon from './Icon';
import RecommendationOutput from './RecommendationOutput';

const RecommendationEngine = ({ userId, handleSignOut }) => {
    const [ph, setPh] = useState(6.5);
    const [cropKey, setCropKey] = useState('Corn');
    const [soilType, setSoilType] = useState('Loamy');
    const [nitrogen, setNitrogen] = useState(50);
    const [phosphorus, setPhosphorus] = useState(30);
    const [potassium, setPotassium] = useState(40);
    const [organicMatter, setOrganicMatter] = useState(3);
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState(null);

    const calculateRecommendation = () => {
        setError(null);
        const cropData = CROP_DATA[cropKey];

        if (!cropData) {
            setError("Please select a valid crop.");
            return;
        }

        const { name, minPh, maxPh, baseFertilizer, notes } = cropData;
        const optimalRange = `${minPh} - ${maxPh}`;

        let phStatus = '';
        let amendmentSuggestion = '';
        let statusColor = 'text-green-700';
        let soilNote = '';

        // 1. Determine pH Status and Amendment
        if (ph < minPh) {
            phStatus = 'Too Acidic';
            statusColor = 'text-red-600';
            if (name === "Blueberries") {
                amendmentSuggestion = (
                    <p className="mt-2 p-2 bg-yellow-100 rounded-lg text-sm">
                        <Icon name="alert-triangle" className="w-4 h-4 inline mr-1 text-yellow-600" />
                        <strong>No action needed:</strong> {name} thrive in very acidic soil.
                    </p>
                );
            } else {
                amendmentSuggestion = (
                    <p className="mt-2 p-2 bg-red-100 rounded-lg text-sm">
                        <Icon name="droplet" className="w-4 h-4 inline mr-1 text-red-600" />
                        <strong>Soil Amendment Recommended (To raise pH):</strong> Apply Agricultural Lime (Calcium Carbonate).
                    </p>
                );
            }
        } else if (ph > maxPh) {
            phStatus = 'Too Alkaline';
            statusColor = 'text-red-600';
            amendmentSuggestion = (
                <p className="mt-2 p-2 bg-red-100 rounded-lg text-sm">
                    <Icon name="droplet" className="w-4 h-4 inline mr-1 text-red-600" />
                    <strong>Soil Amendment Recommended (To lower pH):</strong> Apply Elemental Sulfur or use Ammonium Sulfate as a Nitrogen source.
                </p>
            );
        } else {
            phStatus = 'Optimal Range';
            statusColor = 'text-green-700';
            amendmentSuggestion = (
                <p className="mt-2 p-2 bg-green-100 rounded-lg text-sm">
                    <Icon name="check-circle" className="w-4 h-4 inline mr-1 text-green-600" />
                    <strong>No pH amendment needed:</strong> Your soil pH is currently optimal for {name}.
                </p>
            );
        }

        // 2a. Provide soil-type-specific advice
        switch (soilType) {
            case 'Sandy':
                soilNote = 'Sandy soils drain quickly and hold fewer nutrients — add organic matter and consider split fertilizer applications.';
                break;
            case 'Clay':
                soilNote = 'Clay soils retain water and nutrients but can be compacted; improve structure with organic matter and consider gypsum for sodium issues.';
                break;
            case 'Silty':
                soilNote = 'Silty soils are fertile but may become compacted — maintain organic matter and avoid overworking when wet.';
                break;
            case 'Peaty':
                soilNote = 'Peaty soils are high in organic matter and acidic — monitor pH and fertilize according to crop needs.';
                break;
            case 'Chalky':
                soilNote = 'Chalky soils are alkaline and can tie up nutrients; lower pH with sulfur where appropriate and use chelated micronutrients.';
                break;
            default:
                soilNote = 'Loamy soils are well-balanced — maintain with organic matter and routine soil tests.';
        }

        // 2. Set the recommendation object
        setRecommendation({
            name, optimalRange, phStatus, statusColor, baseFertilizer, notes, amendmentSuggestion, soilType, soilNote,
            nitrogen, phosphorus, potassium, organicMatter
        });
    };

    // Recalculate whenever pH, crop selection, soil type, or soil test values change
    useEffect(() => {
        calculateRecommendation();
    }, [ph, cropKey, soilType, nitrogen, phosphorus, potassium, organicMatter]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-green-200">
                <p className="text-sm text-gray-500 flex items-center">
                    <Icon name="user" className="w-4 h-4 mr-1" />
                    User ID: <span className="font-mono text-xs ml-1 text-green-600 break-all">{userId}</span>
                </p>
                <button
                    onClick={handleSignOut}
                    className="flex items-center text-sm font-semibold text-red-600 hover:text-red-800 p-2 rounded-lg transition duration-150"
                >
                    <Icon name="log-out" className="w-4 h-4 mr-1" />
                    Sign Out
                </button>
            </div>
            
            {/* Input Section */}
            <div>
                <label htmlFor="phInput" className=" text-sm font-medium text-gray-700 flex justify-between">
                    Soil pH: <span id="phValue" className="font-semibold text-lg text-green-700">{ph}</span>
                </label>
                <input 
                    type="range" id="phInput" min="4.0" max="9.0" step="0.1" value={ph}
                    onChange={(e) => setPh(parseFloat(e.target.value))}
                    className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4.0 (Acidic)</span>
                    <span>9.0 (Alkaline)</span>
                </div>
            </div>

            {/* Crop Type Dropdown */}
            <div>
                <label htmlFor="cropSelect" className="block text-sm font-medium text-gray-700">
                    Select Crop Type
                </label>
                <select id="cropSelect" value={cropKey} onChange={(e) => setCropKey(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm bg-white border">
                    {Object.keys(CROP_DATA).map(key => (
                        <option key={key} value={key}>{CROP_DATA[key].name}</option>
                    ))}
                </select>
            </div>

                    {/* Soil type Dropdown */}
            <div>
                <label htmlFor="soilSelect" className='block text-sm font-medium text-gray-700'>
                    Select Soil Type
                </label>
                <select id="soilSelect" value={soilType} onChange={(e) => setSoilType(e.target.value)}
                        className='mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-green-500
                         focus:border-green-500 sm:text-sm rounded-md shadow-sm bg-white border'>
                            {SOIL_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                </select>
            </div>
                
            {/* Soil Test Values Section */}
            <div className="border-t border-green-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Soil Test Values (mg/kg or ppm)</h3>
                
                {/* Nitrogen Input */}
                <div className="mb-3">
                    <label htmlFor="nitrogenInput" className="block text-xs font-medium text-gray-700 flex justify-between">
                        Nitrogen (N): <span className="font-semibold text-green-700">{nitrogen}</span>
                    </label>
                    <input 
                        type="range" id="nitrogenInput" min="0" max="200" step="5" value={nitrogen}
                        onChange={(e) => setNitrogen(parseFloat(e.target.value))}
                        className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Phosphorus Input */}
                <div className="mb-3">
                    <label htmlFor="phosphorusInput" className="block text-xs font-medium text-gray-700 flex justify-between">
                        Phosphorus (P): <span className="font-semibold text-green-700">{phosphorus}</span>
                    </label>
                    <input 
                        type="range" id="phosphorusInput" min="0" max="100" step="5" value={phosphorus}
                        onChange={(e) => setPhosphorus(parseFloat(e.target.value))}
                        className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Potassium Input */}
                <div className="mb-3">
                    <label htmlFor="potassiumInput" className="block text-xs font-medium text-gray-700 flex justify-between">
                        Potassium (K): <span className="font-semibold text-green-700">{potassium}</span>
                    </label>
                    <input 
                        type="range" id="potassiumInput" min="0" max="150" step="5" value={potassium}
                        onChange={(e) => setPotassium(parseFloat(e.target.value))}
                        className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Organic Matter Input */}
                <div className="mb-3">
                    <label htmlFor="organicMatterInput" className="block text-xs font-medium text-gray-700 flex justify-between">
                        Organic Matter (%): <span className="font-semibold text-green-700">{organicMatter.toFixed(1)}</span>
                    </label>
                    <input 
                        type="range" id="organicMatterInput" min="0" max="10" step="0.1" value={organicMatter}
                        onChange={(e) => setOrganicMatter(parseFloat(e.target.value))}
                        className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
                
            {/* Error Box */}
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm flex items-center">
                    <Icon name="alert-triangle" className="w-4 h-4 mr-1" />
                    <span>{error}</span>
                </div>
            )}
            
            <RecommendationOutput recommendation={recommendation} ph={ph} />
        </div>
    );
};

export default RecommendationEngine;