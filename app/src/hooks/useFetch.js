import React, { useEffect, useState } from 'react';

const useFetch = (method, url) => {

   const [loading, setLoading] = useState(false);
   const [res, setRes] = useState(undefined);

   const ConexionApi = axios.create({
      baseURL: urlApi,
      headers: {
         authorization: `Bearer ${localStorage.getItem('token')}`
      }
   })

   useEffect(() => {
      setLoading(true);
      ConexionApi({
         method: method,
         url: url
      })
         .then(function (response) {
            setRes(response);
         })
         .catch(function (error) {
            if (error.response !== undefined) {
               setResponseApi(error.response.data);
            } else {
               setResponseApi("¡Ups! Tuvimos un problema interno, inténtalo más tarde");
            }
         })
         .finally(() => {
            setLoading(false);
         });
   }, [url])

   return {
      loading,
      res
   }

};

export default useFetch;