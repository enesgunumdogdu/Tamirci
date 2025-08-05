/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    MONKEYLEARN_API_KEY: process.env.MONKEYLEARN_API_KEY,
    MONKEYLEARN_MODEL_ID: process.env.MONKEYLEARN_MODEL_ID,
  },
}

module.exports = nextConfig