import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=camiseta&source=nanook",
});
