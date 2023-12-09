import React, { useState, useEffect } from "react";

const TimeLeftCalculator = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = new Date();
      const difference = new Date(targetTime) - currentTime;

      const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

      let formattedTimeLeft = "";

      if (daysLeft > 0) {
        formattedTimeLeft += `${daysLeft} day${daysLeft > 1 ? "s" : ""} `;
      }

      if (hoursLeft > 0) {
        formattedTimeLeft += `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""} `;
      }

      if (minutesLeft > 0) {
        formattedTimeLeft += `${minutesLeft} minute${
          minutesLeft > 1 ? "s" : ""
        } `;
      }

      if (daysLeft === 0 && hoursLeft === 0 && minutesLeft === 0) {
        formattedTimeLeft += `${secondsLeft} second${
          secondsLeft > 1 ? "s" : ""
        }`;
      }

      setTimeLeft(formattedTimeLeft.trim());
    };

    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, [targetTime]);

  return <p>{timeLeft}</p>;
};

export default TimeLeftCalculator;
