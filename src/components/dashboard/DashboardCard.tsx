
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  actionText: string;
  actionIcon?: ReactNode;
  className?: string;
  onClick: () => void;
}

const DashboardCard = ({
  icon,
  title,
  description,
  actionText,
  actionIcon,
  className = "",
  onClick
}: DashboardCardProps) => {
  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start mb-4">
          <div className="mr-4">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        
        <div className="flex-1 mb-4">
          {typeof description === 'string' ? (
            <p className="text-sm text-gray-600">{description}</p>
          ) : (
            description
          )}
        </div>
        
        <Button 
          onClick={onClick} 
          className={`mt-auto ${className || 'bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white'}`}
        >
          {actionText}
          {actionIcon && <span className="ml-2">{actionIcon}</span>}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
