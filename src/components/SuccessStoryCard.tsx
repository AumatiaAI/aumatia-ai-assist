
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface SuccessStory {
  id: number;
  image: string;
  businessName: string;
  location: string;
  sector: string;
  agent: string;
  testimonial: string;
}

interface SuccessStoryCardProps {
  story: SuccessStory;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ story }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative flex justify-center p-6">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img 
            src={story.image} 
            alt={`${story.businessName}`}
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{story.businessName}</h3>
          <Badge variant="outline" className="bg-blue-50 text-[#4A90E2] border-[#4A90E2]/20">
            {story.agent}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          📍 {story.location}, {story.sector}
        </p>
        
        <blockquote className="italic text-gray-700 flex-grow">
          "{story.testimonial}"
        </blockquote>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
