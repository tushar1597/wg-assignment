import { useEffect, useRef, useState } from "react";
import { numberToWords } from "../../utils/helpers";

function Box({ count, widthClass }) {
  const boxRef = useRef(null);
  const [hasLogged, setHasLogged] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasLogged) {
          console.log(`${numberToWords(count)} WAS CALLED`);
          setHasLogged(true);
        }
      });
    };

    const options = {
      root: null, // Using viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // 50% of the element must be in the viewport
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [count, hasLogged, widthClass]);

  return (
    <div ref={boxRef} className={`box h10 flex-shrink-0 ${widthClass}`}>
      {numberToWords(count)}
    </div>
  );
}

export default Box;
