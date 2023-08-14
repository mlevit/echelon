# What is the Echelon web?

The Echelon Web interface is as a dynamic and user-friendly web-based application. Tailored to cater to a diverse audience, this interactive interface provides an intuitive means to visualize and explore the wealth of information stored within the Echelon ecosystem. Its role extends beyond mere visualisation, allowing users to engage with operational workflows, assess data assets, and delve into the details of data lineage and governance, all while maintaining a responsive and engaging user experience.

It is developed using a stack of technologies including [Vue.js](https://vuejs.org/), [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/), [Axios](https://axios-http.com/), [Lodash](https://lodash.com/), [VueUse](https://vueuse.org/), [Tailwind CSS](https://tailwindcss.com/), [Flowbite](https://flowbite.com/) and [Echelon CLI](../cli/).

## How do I set it up?

```shell
npm install
```

### How do I compile and hot-reload it for development?

```shell
npm run dev
```

### How do I compile and minify it for production?

```shell
npm run build
```

## Where do I find the API to power the website?

The API of Echelon Web is powered by the Echelon CLI. To initiate the built-in API server, execute the `echelon start:api` command.

### What environment variables are required?

Create a `.env` file in the `/web` directory with the following variables.

```shell
VITE_META_API_ENV=
VITE_META_API_URL=
```
