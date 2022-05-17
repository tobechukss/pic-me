import { useRef, useState } from "react";


export default function Carousel() {
    const ref = useRef()
 
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
      };
    return (
        <div className="h-[50rem] h-screen z-0 pt-[10rem] bg-cyan-900">
           


        
        </div>
    )
}