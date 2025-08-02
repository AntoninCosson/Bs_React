import { useEffect, useRef } from "react";
import homeStyles from "../styles/Home.module.css";

function WhereIsChairButton({ shopRef, onReveal, show }) {
  const wIsChairRef = useRef(null); // Manip hors DOM de la dive ref

  useEffect(() => {
    const handleCollision = () => {
      //  Get pos
      const WIC = wIsChairRef.current;
      const btnShop = shopRef.current;

      if (WIC && btnShop && show) {
        // Get bondaries of div
        const WIClimit = WIC.getBoundingClientRect();
        const btnShopLimit = btnShop.getBoundingClientRect();

        const isOverlapping = !(
          WIClimit.bottom < btnShopLimit.top ||
          WIClimit.top > btnShopLimit.bottom ||
          WIClimit.right < btnShopLimit.left ||
          WIClimit.left > btnShopLimit.right
        );

        // If touch, Y.WICTop = Y.ShopBottom + ...%
        if (isOverlapping) {
          // Create min distance
          const distMin = window.innerHeight - btnShopLimit.bottom + 1;
          // Dynamism dist of .style
          WIC.style.top = `${distMin}px`;
        } else {
          WIC.style.top = "63%";
        }
      }
    };

    handleCollision();
    window.addEventListener("resize", handleCollision); // Appel dynamique
    return () => window.removeEventListener("resize", handleCollision);
  }, []);

  return (
    <div ref={wIsChairRef} className={homeStyles.divWhereIsChair}>
      <button className={homeStyles.svgButton} onClick={onReveal}>
        <img
          className={homeStyles.whereIsChair}
          src="/EcrisIcon/whereischair.svg"
        />
      </button>
    </div>
  );
}

export default WhereIsChairButton;
