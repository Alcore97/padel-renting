import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.padelrenting.app',
  appName: 'padel-renting-mobile',
  webDir: 'dist/padel-renting',
  server: {
    androidScheme: 'https'
  }
};

export default config;
