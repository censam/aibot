import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { StringOutputParser } from "langchain/schema/output_parser";

document.addEventListener("submit", (e) => {
 e.preventDefault();
 progressConversation();
});

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const embeddings = new OpenAIEmbeddings({ openAIApiKey });
const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const sbUrl = import.meta.env.VITE_SUPABASE_URL_LC_CHATBOT;
const client = createClient(sbUrl, sbApiKey);

const vectorStore = new SupabaseVectorStore(embeddings, {
 client,
 tableName: "documents",
 queryName: "match_documents",
});

const retriever = vectorStore.asRetriever();

const llm = new ChatOpenAI({ openAIApiKey });

const standaloneQuestionTemplate =
 "Given a question, convert it to a standalone question. question: {question} standalone question:";

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
 standaloneQuestionTemplate
);

const standaloneQuestionChain = standaloneQuestionPrompt
 .pipe(llm)
 .pipe(new StringOutputParser())
 .pipe(retriever);

const response = await standaloneQuestionChain.invoke({
 question:
  "What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.",
});

console.log(response);
