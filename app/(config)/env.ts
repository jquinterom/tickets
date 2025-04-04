const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  ENV: process.env.NEXT_PUBLIC_ENV,
};

if (typeof window !== "undefined") {
  if (!ENV.API_BASE_URL) {
    console.error("❌ NEXT_PUBLIC_API_BASE_URL is not defined in .env");
  }
}

export default ENV;
