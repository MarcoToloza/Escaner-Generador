import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'qr-code-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
