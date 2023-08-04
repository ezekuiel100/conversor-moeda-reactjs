// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  let [resultado, setResultado] = useState("");
  let [quantia, setQuantia] = useState(1);
  let [primeiraMoeda, setPrimeiraMoeda] = useState("EUR");
  let [segundaMoeda, setSegundaMoeda] = useState("USD");
  let [isLoading, setLoading] = useState(false);

  function handleQuantia(e) {
    setQuantia(e);
  }

  useEffect(() => {
    async function fetchData() {
      if (primeiraMoeda == segundaMoeda) return setResultado(quantia);
      setLoading(true);
      let res = await fetch(
        `https://api.frankfurter.app/latest?amount=${quantia}&from=${primeiraMoeda}&to=${segundaMoeda}`
      );
      let data = await res.json();

      setResultado(Object.values(data.rates));
      setLoading(false);
    }

    fetchData();
  }, [quantia, primeiraMoeda, segundaMoeda]);

  return (
    <div>
      <input
        type="text"
        value={quantia}
        onChange={(e) => handleQuantia(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={primeiraMoeda}
        onChange={(moeda) => setPrimeiraMoeda(moeda.target.value)}
        disabled={isLoading}
      >
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={segundaMoeda}
        onChange={(moeda) => setSegundaMoeda(moeda.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Loading..." : resultado}</p>
    </div>
  );
}
