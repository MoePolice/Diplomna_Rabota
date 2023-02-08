import React from "react";

function Footer() {
  return (
    <footer className="bg-light py-3">
      <div className="container">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Freelance Webpage
        </p>
      </div>
    </footer>
  );
}

export default Footer;
