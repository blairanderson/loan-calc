import React from "react";
import queryString from "query-string";
import debounce from "../utils/debounce";
const DELAY_PUSH_STATE = 300;

function getNewUrl(props) {
  return (
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    `?${queryString.stringify(props)}`
  );
}

function pushStateNow(newUrl) {
  window.history.pushState({ path: newUrl }, "", newUrl);
}

const pushState = debounce(pushStateNow, DELAY_PUSH_STATE);

function Sharing(props) {
  const { amount, duration, interestRate } = props;
  const path = getNewUrl(props);
  const encoded = encodeURI(path);
  const twitterparams = queryString.stringify({
    text: "Open Source Loan Calculator",
    url: encoded
  });

  React.useEffect(() => {
    function updateUrl({ amount, duration, interestRate }) {
      const newurl = getNewUrl({ amount, duration, interestRate });
      pushState(newurl);
    }

    updateUrl({ amount, duration, interestRate });
  }, [amount, duration, interestRate]); // ✅ Resync URL on change

  return (
    <div className="mv2">
      <a
        className="resp-sharing-button__link"
        href={`https://facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        ariaLabel="Facebook"
      >
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium">
          <div
            ariaHidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11.5" />
              <path d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z" />
            </svg>
          </div>
          Facebook
        </div>
      </a>

      <a
        className="resp-sharing-button__link"
        href={`https://twitter.com/intent/tweet/?${twitterparams}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z" />
              <circle cx="12" cy="12" r="11.5" />
            </svg>
          </div>
          Twitter
        </div>
      </a>

      <a
        className="resp-sharing-button__link"
        href={`mailto:?subject=Open%20Source%20Loan%20Calculator&body=${encoded}`}
        target="_self"
        aria-label="E-Mail"
      >
        <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19.5 16c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5v8zm-2-7.5L12 13 6.5 8.5m11 6l-4-2.5m-7 2.5l4-2.5" />
              <circle cx="12" cy="12" r="11.5" />
            </svg>
          </div>
          E-Mail
        </div>
      </a>
    </div>
  );
}

export default Sharing;
