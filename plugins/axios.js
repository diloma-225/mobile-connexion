import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const instance = axios.create();
    instance.defaults.baseURL = config.public.apiBaseUrl;
    //instance.defaults.withCredentials= true;
    instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    return {
    provide: {
      axios: instance,
    },
  };
});