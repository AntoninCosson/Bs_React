import { useState } from "react";
import homeStyles from "../styles/Home.module.css";

function ChairSavage({ chairRef, onFinish }) {
  const [chairClickCount, setChairClickCount] = useState(0); // Chair click count start at 0

  const getNoNoNoZone = () => {
    const safePortfolio = document.querySelector(`.${homeStyles.divPortfolio}`); // verif homeStyles.divShop si bonne div
    const safeShop = document.querySelector(`.${homeStyles.divShop}`);
    const safeNextGuest = document.querySelector(`.${homeStyles.divNextGuest}`);
    return [safePortfolio, safeShop, safeNextGuest].map((el) =>
      el.getBoundingClientRect()
    );
  };

  // Create Safe Zone
  const getYesYesYesZone = (zones) => {
    let x, y;
    let safe = false;

    // While it's safe create a random pos
    while (!safe) {
      x = Math.floor(Math.random() * window.innerWidth);
      y = Math.floor(Math.random() * window.innerHeight);

      // Check if safe
      safe = zones.every((zone) => {
        const outside =
          x < zone.left || x > zone.right || y > zone.bottom || y < zone.top;
        return outside;
      });
    }
    return { x, y };
  };

  const handleChairClick = () => {
    const chairDiv = chairRef.current;
    if (!chairDiv) return;

    const chairImg = chairDiv.querySelector("img");
    if (!chairImg) return;

    chairImg.classList.add(homeStyles.animate);

    chairImg.addEventListener(
      "animationend",
      () => {
        chairImg.classList.remove(homeStyles.animate);

        // Calc of safe Position after anim
        setTimeout(() => {
          const NoNoNoZone = getNoNoNoZone();
          const { x, y } = getYesYesYesZone(NoNoNoZone);

          // New pos
          chairDiv.style.left = `${x}px`;
          chairDiv.style.top = `${y}px`;
          chairDiv.style.display = "block";

          const newCount = chairClickCount + 1;
          console.log("Click count:", newCount);
          setChairClickCount(newCount);

          if (newCount === 1) {
            chairDiv.style.display = "none";
            setTimeout(() => {
              onFinish();
            }, 100);
          }
        }, 50);
      },
      { once: true }
    );
  };

  return (
    <div
      ref={chairRef}
      className={`${homeStyles.divWhereIsChair} ${homeStyles.positionedChair}`}
    >
      <img
        onClick={handleChairClick}
        className={homeStyles.Chair}
        src="/EcrisIcon/chair.svg"
      />
    </div>
  );
}

export default ChairSavage;
