import React from 'react';
import Icon from './Icon';

const RecommendationOutput = ({ recommendation, ph }) => {
    if (!recommendation) return null;

    return (
        <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-200 shadow-inner">
            <h2 className="text-xl font-bold mb-3 text-green-800 flex items-center">
                <Icon name="clipboard-list" className="w-5 h-5 mr-2" />
                Summary for {recommendation.name}
            </h2>

            <div className="space-y-3">
                <p className="text-sm">
                    <span className="font-medium text-gray-700">Optimal pH Range:</span> {recommendation.optimalRange}
                </p>
                <p className="text-sm">
                    <span className="font-medium text-gray-700">Current Soil pH Status:</span>
                    <span className={`font-bold ml-1 ${recommendation.statusColor}`}>{ph} ({recommendation.phStatus})</span>
                </p>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-md">
                <h3 className="font-bold text-lg text-green-700 flex items-center mb-2">
                    <Icon name="leaf" className="w-4 h-4 mr-2" />
                    Primary Fertilizer
                </h3>
                <p className="text-gray-800 font-semibold">{recommendation.baseFertilizer}</p>
                <p className="text-xs text-gray-500 mt-1">{recommendation.notes}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-bold text-lg text-green-700 flex items-center mb-1">
                    <Icon name="droplet" className="w-4 h-4 mr-2" />
                    Soil pH Amendment
                </h3>
                {recommendation.amendmentSuggestion}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-lg text-blue-700 flex items-center mb-2">
                    <Icon name="leaf" className="w-4 h-4 mr-2" />
                    Soil Type: {recommendation.soilType}
                </h3>
                <p className="text-sm text-gray-700">{recommendation.soilNote}</p>
            </div>

            <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-bold text-lg text-purple-700 mb-2">Soil Test Results (ppm)</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <span className="font-medium text-gray-700">Nitrogen (N):</span>
                        <p className="text-purple-700 font-semibold">{recommendation.nitrogen} ppm</p>
                        {recommendation.nitrogen < 40 && <p className="text-xs text-red-600">⚠ Low - Consider fertilizer</p>}
                        {recommendation.nitrogen >= 40 && recommendation.nitrogen <= 120 && <p className="text-xs text-green-600">✓ Adequate</p>}
                        {recommendation.nitrogen > 120 && <p className="text-xs text-orange-600">⚠ High - May reduce fertilizer</p>}
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Phosphorus (P):</span>
                        <p className="text-purple-700 font-semibold">{recommendation.phosphorus} ppm</p>
                        {recommendation.phosphorus < 20 && <p className="text-xs text-red-600">⚠ Low - Consider P fertilizer</p>}
                        {recommendation.phosphorus >= 20 && recommendation.phosphorus <= 50 && <p className="text-xs text-green-600">✓ Adequate</p>}
                        {recommendation.phosphorus > 50 && <p className="text-xs text-orange-600">⚠ High</p>}
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Potassium (K):</span>
                        <p className="text-purple-700 font-semibold">{recommendation.potassium} ppm</p>
                        {recommendation.potassium < 100 && <p className="text-xs text-red-600">⚠ Low - Consider K fertilizer</p>}
                        {recommendation.potassium >= 100 && recommendation.potassium <= 200 && <p className="text-xs text-green-600">✓ Adequate</p>}
                        {recommendation.potassium > 200 && <p className="text-xs text-orange-600">⚠ High</p>}
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Organic Matter:</span>
                        <p className="text-purple-700 font-semibold">{recommendation.organicMatter.toFixed(1)}%</p>
                        {recommendation.organicMatter < 2 && <p className="text-xs text-red-600">⚠ Low - Add compost</p>}
                        {recommendation.organicMatter >= 2 && recommendation.organicMatter <= 5 && <p className="text-xs text-green-600">✓ Good</p>}
                        {recommendation.organicMatter > 5 && <p className="text-xs text-green-600">✓ Excellent</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationOutput;