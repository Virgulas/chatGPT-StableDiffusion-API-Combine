const artMaker = require("./stableDiffusion");
const promptGenerator = require("./chatGPT");

async function artGenerator (initialPrompt) {
    const prompt = await promptGenerator(initialPrompt);
    console.log(prompt);
    await artMaker(prompt);
}

artGenerator("Write about a girl in a mountain. Describe her looks in details.");