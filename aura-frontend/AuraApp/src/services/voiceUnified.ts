import { Platform } from 'react-native';
import { voiceService } from './voice';
import { webVoiceService } from './webVoice';
import { VoiceRecognitionResult, VoiceRecognitionCallbacks } from './voice';

class UnifiedVoiceService {
  private getVoiceService() {
    return Platform.OS === 'web' ? webVoiceService : voiceService;
  }

  async requestPermissions(): Promise<boolean> {
    try {
      return await this.getVoiceService().requestPermissions();
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }

  async startListening(
    language: string = 'en-US',
    callbacks: VoiceRecognitionCallbacks = {}
  ): Promise<void> {
    try {
      const service = this.getVoiceService();
      
      // Check if service is available first
      const isAvailable = await service.isAvailable();
      if (!isAvailable) {
        throw new Error('Speech recognition not available on this platform');
      }

      await service.startListening(language, callbacks);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      callbacks.onError?.(error);
      throw error;
    }
  }

  async stopListening(): Promise<void> {
    try {
      await this.getVoiceService().stopListening();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
      throw error;
    }
  }

  async cancelListening(): Promise<void> {
    try {
      await this.getVoiceService().cancelListening();
    } catch (error) {
      console.error('Error canceling voice recognition:', error);
      throw error;
    }
  }

  getIsListening(): boolean {
    return this.getVoiceService().getIsListening();
  }

  async isAvailable(): Promise<boolean> {
    try {
      return await this.getVoiceService().isAvailable();
    } catch (error) {
      console.error('Error checking voice availability:', error);
      return false;
    }
  }

  async getSupportedLanguages(): Promise<string[]> {
    try {
      return await this.getVoiceService().getSupportedLanguages();
    } catch (error) {
      console.error('Error getting supported languages:', error);
      return ['en-US'];
    }
  }

  destroy() {
    try {
      this.getVoiceService().destroy();
    } catch (error) {
      console.error('Error destroying voice service:', error);
    }
  }
}

export const unifiedVoiceService = new UnifiedVoiceService();
export { VoiceRecognitionResult, VoiceRecognitionCallbacks };