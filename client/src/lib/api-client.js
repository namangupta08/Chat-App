//const { HOST } = require("@/utils/constants");
//const { default: axios } = require("axios");

import axios from "axios";
import { HOST } from "@/utils/constants.js";



export const apiClient = axios.create({
    baseURL:HOST,

})

