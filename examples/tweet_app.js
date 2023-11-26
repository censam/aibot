import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const llm = new ChatOpenAI({ openAIApiKey });

const tweetTemplate =
 "Generate a promotional tweet for a product, from this product description: {productDesc}";

const tweetPrompt = PromptTemplate.fromTemplate(tweetTemplate);

const tweetChain = tweetPrompt.pipe(llm);

const response = await tweetChain.invoke({ productDesc: "School shoes" });

console.log(response.content);
