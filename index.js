import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

try {
 const result = await fetch("scrimba-info.txt");
 const text = await result.text();
 const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 20,
  separators: ["\n\n", "\n", " ", ""],
 });

 const output = await splitter.createDocuments([text]);

 const sbApiKey = process.env.SUPABASE_API_KEY;
 const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT;
 const openAIApiKey = process.env.OPENAI_API_KEY;

 const client = createClient(sbUrl, sbApiKey);

 console.log(output);
} catch (err) {
 console.log(err);
}
