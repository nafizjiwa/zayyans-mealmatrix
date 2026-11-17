const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`

export default async (req) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 })
    }

    try {
        const { ingredientsArr } = await req.json()
        const ingredientsString = ingredientsArr.join(", ")
        const apiKey = process.env.GEMINI_API_KEY

        const baseUrl = "https://generativelanguage." + "googleapis.com"
const endpoint = baseUrl + "/v1beta/models/gemini-flash-lite-latest:generateContent"


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
            return new Response(
                JSON.stringify({ error: data.error?.message || "Failed to fetch recipe" }),
                { status: response.status, headers: { "Content-Type": "application/json" } }
            )
        }

        const recipe = data.candidates[0].content.parts[0].text
        return new Response(JSON.stringify({ recipe }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })
    } catch (err) {
        console.error("Server error:", err)
        return new Response(
            JSON.stringify({ error: "Server error generating recipe" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        )
    }
}





// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`

// export default async (req) => {
//     if (req.method !== "POST") {
//         return new Response("Method Not Allowed", { status: 405 })
//     }

//     try {
//         const { ingredientsArr } = await req.json()
//         const ingredientsString = ingredientsArr.join(", ")
//         const apiKey = process.env.GEMINI_API_KEY

//         const endpoint = "https://googleapis.com"

//         const response = await fetch(endpoint, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-goog-api-key": apiKey
//             },
//             body: JSON.stringify({
//                 systemInstruction: {
//                     parts: [{ text: SYSTEM_PROMPT }]
//                 },
//                 contents: [
//                     {
//                         parts: [
//                             { text: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
//                         ]
//                     }
//                 ]
//             })
//         })

//         const data = await response.json()

//         if (!response.ok) {
//             return new Response(
//                 JSON.stringify({ error: data.error?.message || "Failed to fetch recipe" }),
//                 { status: response.status, headers: { "Content-Type": "application/json" } }
//             )
//         }

//         const recipe = data.candidates[0].content.parts[0].text
//         return new Response(JSON.stringify({ recipe }), {
//             status: 200,
//             headers: { "Content-Type": "application/json" }
//         })
//     } catch (err) {
//         console.error("Server error:", err)
//         return new Response(
//             JSON.stringify({ error: "Server error generating recipe" }),
//             { status: 500, headers: { "Content-Type": "application/json" } }
//         )
//     }
// }
