export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY';
export const PHASE_REPOSITORY = 'PHASE_REPOSITORY';
export const TASK_REPOSITORY = 'TASK_REPOSITORY';
export const COMPANY_TASK_REPOSITORY = 'COMPANY_TASK_REPOSITORY';

export const appName = process.env.APP_NAME ?? 'GRAPHQL_MICROSERVICE';
export const encryptionKey = process.env.ENCRYPTION_KEY ?? 'undefinedkey';
export const apiGatewayUrl =
  process.env.API_GATEWAY_URL ?? 'https://gateway.softafrik.com';
export const port = process.env.PORT ?? 3000;
