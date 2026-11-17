const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    const endpoint = atob("aHR0cHM6Ly9nZW5lcmF0aXZlbGFuZ3VhZ2UuZ29vZ2xlYXBpcy5jb20vdjFiZXRhL21vZGVscy9nZW1pbmktZmxhc2gtbGF0ZXN0OmdlbkNvbnRlbnQ=")
    .replace("genContent", "generateContent")
    .replace("gemini-flash-latest", "gemini-flash-lite-latest")



    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: [
                    {
                        parts: [
                            { text: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
                        ]
                    }
                ]
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to fetch recipe")
        }

        return data.candidates[0].content.parts[0].text
    } catch (err) {
        console.error("Fetch error details:", err)
        return "Sorry, the AI chef is temporarily busy right now. Please try clicking **Get a recipe** again in a few seconds!"
    }
}









// console.log("Token loaded?", Boolean(import.meta.env.VITE_HF_ACCESS_TOKEN))
// // Environment variable set up for HF_ACCESS_TOKEN
// const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN)

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try {
//         const response = await hf.chatCompletion({
//             model: "meta-llama/Llama-3.2-3B-Instruct",
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//             ],
//             max_tokens: 1024,
//         })
//         return response.choices[0].message.content
//     } catch (err) {
//         console.error("Full error:", err)
//     }
// }