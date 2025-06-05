const config = {
  env: {
    apiEndPoint: process.env.NEXT_PUBLIC_PUBLIC_API_ENDPOINT!,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
    },

    databaseUrl: process.env.DATABASE_URL!,

    upstash: {
      redishUrl: process.env.UPSTASH_REDIS_URL!,
      redishToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
  },
};

export default config;
