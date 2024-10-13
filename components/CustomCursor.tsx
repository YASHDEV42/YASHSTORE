"use client";
import React, { useEffect, useState } from "react";
import styles from "./CustomCursor.module.css"; // Import your CSS module

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [url, setUrl] = useState(window?.location.href);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = () => {
      const cursor = document.querySelector(`.${styles.cursor}`);
      if (cursor) cursor.classList.add(styles.cursorHovered); // Use styles.cursorHovered
    };
    const handleMouseOut = () => {
      const cursor = document.querySelector(`.${styles.cursor}`);
      if (cursor) cursor.classList.remove(styles.cursorHovered); // Use styles.cursorHovered
    };
    const handleMouseClick = () => {
      const cursor = document.querySelector(`.${styles.cursor}`);
      if (cursor) cursor.classList.remove(styles.cursorHovered);
    };

    const hoverableElements = document.querySelectorAll("a, button, li");

    hoverableElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      hoverableElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [url]);

  return (
    <div
      className={styles.cursor} // Apply styles.cursor here
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
