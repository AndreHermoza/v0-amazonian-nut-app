'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: 'primary' | 'accent' | 'secondary';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtext?: string;
}

const colorClasses = {
  primary: 'from-primary/8 to-primary/3 border-primary/15 shadow-sm',
  accent: 'from-accent/8 to-accent/3 border-accent/15 shadow-sm',
  secondary: 'from-secondary/8 to-secondary/3 border-secondary/15 shadow-sm',
};

const iconColorClasses = {
  primary: 'text-primary',
  accent: 'text-accent',
  secondary: 'text-secondary',
};

export function MetricCard({
  label,
  value,
  icon,
  color,
  trend,
  subtext,
}: MetricCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 backdrop-blur-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconColorClasses[color]} opacity-80`}>{icon}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {trend.value}%
          </div>
        )}
      </div>

      <p className="text-foreground/60 text-sm font-medium mb-2">{label}</p>
      <p className="text-3xl font-bold text-foreground mb-2 break-words">{value}</p>

      {subtext && <p className="text-xs text-foreground/50 line-clamp-2">{subtext}</p>}
    </div>
  );
}
