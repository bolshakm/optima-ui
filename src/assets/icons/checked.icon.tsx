import React from 'react';

interface IProps {
  width?: number;
  height?: number;
  color?: string;
}

export const CheckedIcon: React.FC<IProps> = ({
  width = 18,
  height = 14,
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
      d="M5.59637 13.1512L0 7.72967L1.17166 6.59461L5.59637 10.8811L16.8283 0L18 1.13506L5.59637 13.1512Z" 
      fill={color}
    />
  </svg>
)