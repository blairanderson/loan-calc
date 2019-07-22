import React from "react";

function ZillowNav() {
  const [data, setData] = React.useState({});
  const [search, setSearch] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      fetch(".netlify/functions/rates", {
        method: "GET",
        mode: "no-cors"
      })
        .then(function(response) {
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          setData(myJson);
          setSearch(false);
        })
        .catch(function(err) {
          setData({ error: err });
          setSearch(false);
        });
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  const { query, samples } = data;

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
      {query && samples && <div>{JSON.stringify(data)}</div>}
    </header>
  );
}

export default ZillowNav;
