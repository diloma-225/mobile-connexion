// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
      '@nuxtjs/ionic',
      '@pinia/nuxt',
      '@nuxtjs/supabase',
      '@nuxtjs/color-mode',
      '@nuxtjs/tailwindcss'
    ],
    colorMode:{
      classSuffix:''
    },
    tailwindcss: {
      cssPath: '~/assets/css/tailwind.css',
      configPath: 'tailwind.config',
      exposeConfig: false,
      config: {},
      injectPosition: 0,
      viewer: true,
    },
    
/*     css: ['~/assets/css/main.css'], */
/*     postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    }, */
    runtimeConfig:{
      public:{
        //apiBaseUrl:'http://localhost:8000'
        //apiBaseUrl:'https://blog.hlcgroup.org',

      }
    }
})
