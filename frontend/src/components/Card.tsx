
import React from 'react'
import "../styles/Card.css";

interface CardProps  {
  className?: string,
  children: React.ReactNode
}

const Card = ({className, children}: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

export default Card