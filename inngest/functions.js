import { supabase } from "../services/Supabase";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const llmModel = inngest.createFunction(
    { id: 'llm-model' },
    { event: 'llm-model' },
    async ({ event, step }) => {
        const aiResp = await step.ai.infer('generate-ai-llm-model-call', {
            model: step.ai.models.gemini({
                model: 'gemini-1.5-flash',
                apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
            }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text:
                                    `
You are a helpful assistant. Based on the information below:

- Summarize the topic.
- Format your response using proper **Markdown** (headings, bullet points, bold text, etc.).
- Ensure the output is clean, readable, and structured.

### User Input:
${event.data.searchInput}

### Search Results (from the web):
${JSON.stringify(event.data.searchResult, null, 2)}

Respond only in Markdown format.`
                            }
                        ]
                    }
                ]
            }

        })

        const saveToDb = await step.run('saveToDb', async () => {
            console.log(aiResp)
            const { data, error } = await supabase
                .from('chats')
                .update({ aiResp: aiResp?.candidates[0].content.parts[0].text })
                .eq('id', event.data.recordId)
                .select()

            return aiResp;

        })
    }
)