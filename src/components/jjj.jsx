import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VUE_APP_OPENAI_API_KEY,
});
export default openai;
