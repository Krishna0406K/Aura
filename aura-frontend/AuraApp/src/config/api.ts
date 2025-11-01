export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  WEBSOCKET_URL: 'ws://localhost:8080',
  ENDPOINTS: {
    // User endpoints
    PROFILE: '/api/users/profile',

    // Appointment endpoints
    APPOINTMENTS: '/api/appointments',

    // AI endpoints
    DIALOGFLOW: '/api/ai/dialogflow/detect-intent',
    SUMMARIZE: '/api/ai/summarize',
    GENERATE: '/api/ai/generate',
    AI_CHAT: '/api/ai/chat',
    AI_VOICE_COMMAND: '/api/ai/voice-command',
    AI_CONVERSATION: '/api/ai/conversation',
    
    // Health Insights endpoints
    HEALTH_SUMMARY: '/api/insights/health-summary',
    ANALYZE_SYMPTOMS: '/api/insights/analyze-symptoms',
  },
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  LANGUAGE_PREFERENCE: 'language_preference',
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'hi-IN', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'bn-IN', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'te-IN', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'mr-IN', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'kn-IN', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ml-IN', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'or-IN', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
  { code: 'as-IN', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' },
  { code: 'ur-IN', name: 'اردو (Urdu)', flag: '🇮🇳' },
  { code: 'es-ES', name: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch (German)', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italiano (Italian)', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Português (Portuguese)', flag: '🇧🇷' },
  { code: 'zh-CN', name: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'ja-JP', name: '日本語 (Japanese)', flag: '🇯🇵' },
  { code: 'ar-SA', name: 'العربية (Arabic)', flag: '🇸🇦' },
];

// Development mode configuration
export const DEV_CONFIG = {
  MOCK_API: false, // Disable mock responses - use real backend
  SHOW_API_ERRORS: true, // Show detailed error messages
};