import { useEffect, useState } from "react";

const useProviders = () => {
  const [providers, setProviders] = useState([]);
  const [providersLoading, setProvidersLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/providers")
      .then((res) => res.json())
      .then((data) => {
        setProviders(data);
        setProvidersLoading(false);
      });
  }, []);
  return [providers, providersLoading];
};

export default useProviders;
