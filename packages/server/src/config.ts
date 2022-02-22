export const appConfig: configSchema = {
    "MONGO_URL": "mongodb+srv://aaronmartin:dafhPQWBW3TUFBq@mpsbelfast01.pplvk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "PORT": 5000,
    "JWT_TOKEN_SECRET": "test_secret",
    "DEBUG": true,
}

type configSchema = {
    MONGO_URL: string,
    PORT: number,
    JWT_TOKEN_SECRET: string,
    DEBUG: boolean
}
