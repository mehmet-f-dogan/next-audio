import React from "react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <>
      <section id="error_page" className="section">
        <div className="container">
          <div className="error_page_content">
            <h1>500</h1>
            <h2>Server Error</h2>
            <h3>Sorry, something went wrong.</h3>
            <Link href="/" className="btn">
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
