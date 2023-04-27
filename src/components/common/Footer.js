import React, { useState } from "react";

const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="container">
        <p>
          {currYear} | NextAudio |{" "}
          <a href="https://mehmetfd.dev/">Mehmet F. Dogan</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
