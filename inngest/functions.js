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
                                    `Depends on user input sources, Summarize and search about topic, ` +
                                    `Give me markdown text proper formatting. User Input is: ${event.data.searchInput}\n\n` +
                                    `Search Results: ${JSON.stringify(event.data.searchResult)}`
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