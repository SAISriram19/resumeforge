const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getModel = (modelName = 'gemini-1.5-flash') => {
  return genAI.getGenerativeModel({ model: modelName });
};

const getEmbeddingModel = () => {
  return genAI.getGenerativeModel({ model: 'text-embedding-004' });
};

module.exports = { getModel, getEmbeddingModel };
