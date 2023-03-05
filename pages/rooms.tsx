import { useActivatedGuard } from '@/Hooks/UseActivatedGuard';
import React from 'react'

const Rooms = () => {
    useActivatedGuard();
  return (
    <div>rooms</div>
  )
}

export default Rooms