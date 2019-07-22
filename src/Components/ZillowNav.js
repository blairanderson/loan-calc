import React from "react";

function ZillowNav() {
  const [data, setData] = React.useState({ hits: [] });
  const [search, setSearch] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      fetch("https://mortgageapi.zillow.com/getRates?partnerId=RD-RRVHPYZ", {
        method: 'GET',
        mode: 'no-cors'
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          setData(myJson);
          setSearch(false);
        });
    };
    if (search) {
      fetchData();
    }
  }, [search]);

  

  return (
    <header className="ph3 ph5-ns pt3 bb bt b--black-10 mb3">
      <div className="mw9 center">
        <button
          className={"f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc"}
          onClick={event => {
            setSearch(true);
          }}
        >
          Search
        </button>
      </div>
      {JSON.stringify(data)}
    </header>
  );
}

export default ZillowNav;
