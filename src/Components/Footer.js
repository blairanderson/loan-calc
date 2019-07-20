import React from "react";

function Footer() {
  return (
    <footer className="bg-near-black white-80 pv5 pv6-l ph4">
      <p className="f6">
        <span className="dib mr4 mr5-ns">
          ©{new Date().getFullYear()} Blair Anderson
        </span>

        <a
          className="link white-80 hover-green"
          target="_blank"
          href="https://github.com/blairanderson/loan-calc/issues/new?title=Suggestion+or+Idea"
        >
          Suggestions or Ideas
        </a>
      </p>
    </footer>
  );
}

export default Footer;
