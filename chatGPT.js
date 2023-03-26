const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.APIKEY,
});
const openai = new OpenAIApi(configuration);

const promptGenerator = async (prompt) => {

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 225,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

    return response.data.choices[0].text;
};

module.exports = promptGenerator;
