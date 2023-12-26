import React from 'react';

interface IProps {
  width?: number;
  height?: number;
  color?: string;
}

export const PlusIcon: React.FC<IProps> = ({
  width = 10,
  height = 10,
  color = '#fff',
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox={`0 0 ${width} ${height}`} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M4.04972 9.22656V0.379971H6.05682V9.22656H4.04972ZM0.629972 5.80682V3.79972H9.47656V5.80682H0.629972Z" 
      fill={color} 
    />
  </svg>
)