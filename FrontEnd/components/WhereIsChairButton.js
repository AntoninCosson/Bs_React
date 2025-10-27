import { useEffect, useRef } from "react";
import homeStyles from "../styles/Home.module.css";

function WhereIsChairButton({ shopRef, onReveal, show }) {
  const wIsChairRef = useRef(null);

  useEffect(() => {
    const handleCollision = () => {
      const WIC = wIsChairRef.current;
      const btnShop = shopRef.current;

      if (WIC && btnShop && show) {
        const WIClimit = WIC.getBoundingClientRect();
        const btnShopLimit = btnShop.getBoundingClientRect();

        const isOverlapping = !(
          WIClimit.bottom < btnShopLimit.top ||
          WIClimit.top > btnShopLimit.bottom ||
          WIClimit.right < btnShopLimit.left ||
          WIClimit.left > btnShopLimit.right
        );

        if (isOverlapping) {

          const distMin = window.innerHeight - btnShopLimit.bottom + 1;
          WIC.style.top = `${distMin}px`;
        } else {
          WIC.style.top = "63%";
        }
      }
    };

    handleCollision();
    window.addEventListener("resize", handleCollision);
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