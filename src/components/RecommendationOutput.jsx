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
        </div>
    );
};

export default RecommendationOutput;