import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  jwtSecret: string;
}

if (!process.env['JWT_SECRET']) {
  throw new Error("Missing JWT_SECRET in .env file");
}
const config: Config = {
  port: Number(process.env['PORT']) || 3000,
  jwtSecret: process.env['JWT_SECRET'],
};

export default config;
