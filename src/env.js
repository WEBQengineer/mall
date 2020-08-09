let baseURL;

switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'api'
    break;
  case 'test':
    baseURL = ''
    break;
  case 'production':
    baseURL = ''
    break;
  default:
    break;
}

export default {
  baseURL
}