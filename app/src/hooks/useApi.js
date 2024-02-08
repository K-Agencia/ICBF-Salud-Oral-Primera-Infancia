import axios from "axios";
import { useState } from "react";
import { urlApi } from "../constants/RouterLinks";

export const useApi = () => {

   const [loading, setLoading] = useState(false);
   const [responseApi, setResponseApi] = useState(undefined);

   const ConexionApi = axios.create({
      baseURL: urlApi,
      headers: {
         authorization: `Bearer ${localStorage.getItem('token')}`
      }
   })

   const ConexionApiFormData = axios.create({
      baseURL: urlApi,
      headers: {
         authorization: `Bearer ${localStorage.getItem('token')}`,
         'Content-Type': 'multipart/form-data'
      }
   })

   const api_handleSubmit = async (form, formData) => {

      const auth = get_Auth(form);

      const conexion = !formData ? ConexionApi : ConexionApiFormData;

      setLoading(true);
      const datos = await new Promise((resolve) => {
         conexion({
            method: form.method,
            url: form.url,
            params: form.params,
            data: formData || form,
            auth: auth
         })
            .then((response) => {
               setResponseApi(response);
               resolve(response);
            })
            .catch((error) => {
               if (error.response !== undefined) {
                  setResponseApi(error.response.data);
                  resolve(error.response.data)
               } else {
                  setResponseApi("¡Ups! Tuvimos un problema interno, inténtalo más tarde");
                  resolve("¡Ups! Tuvimos un problema interno, inténtalo más tarde")
               }
            })
            .finally(() => {
               setLoading(false);
            })
      });

      return (datos);
   };

   const get_Auth = (form) => {

      if (form.auth) {
         return {
            username: form.auth.correo,
            password: form.auth.password
         }
      } else { return null }
   }

   return {
      loading,
      responseApi,
      api_handleSubmit
   }
}