import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fb27ee391d4b40f48132e54a2afb004b',
  appName: 'Voice Assistant - Lovable Project',
  webDir: 'dist',
  server: {
    url: 'https://fb27ee39-1d4b-40f4-8132-e54a2afb004b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    App: {
      windowBackgroundColorIosLight: '#1e1e2e',
      windowBackgroundColorIosDark: '#1e1e2e',
      backgroundColorIosLight: '#1e1e2e',
      backgroundColorIosDark: '#1e1e2e'
    }
  }
};

export default config;