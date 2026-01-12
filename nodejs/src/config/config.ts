import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  jwtSecret: string;
}

const config: Config = {
  port: Number(process.env['PORT']) || 3000,
  jwtSecret: process.env['JWT_SECRET'] || "",
};

export default config;
