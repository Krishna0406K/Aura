import { API_CONFIG } from '../config/api';
import { mockApiService } from './mockApi';

const DEV_CONFIG = {
  MOCK_API: false, // Now using real backend
  SHOW_API_ERRORS: true,
};
import {
  User,
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
  DialogflowRequest,
  DialogflowResponse,
  SummarizeRequest,
  SummarizeResponse,
  GenerateAIRequest,
  GenerateAIResponse,
  ApiResponse,
} from '../types';

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const headers = API_CONFIG.HEADERS;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.msg || 'Network error');
      }

      return response.json();
    } catch (error) {
      // If backend is not available and we're in development mode, use mock API
      if (DEV_CONFIG.MOCK_API && (error as Error).message.includes('fetch')) {
        console.warn('🔧 Backend not available, using mock API for:', endpoint);
        throw new Error('Backend not available - using mock API');
      }
      throw error;
    }
  }



  // User methods
  async getProfile(): Promise<User> {
    try {
      return await this.makeRequest<User>(API_CONFIG.ENDPOINTS.PROFILE);
    } catch (error) {
      if (DEV_CONFIG.MOCK_API && (error as Error).message.includes('Backend not available')) {
        return mockApiService.getProfile();
      }
      throw error;
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      return await this.makeRequest<User>(API_CONFIG.ENDPOINTS.PROFILE, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      if (DEV_CONFIG.MOCK_API && (error as Error).message.includes('Backend not available')) {
        return mockApiService.updateProfile(userData);
      }
      throw error;
    }
  }

  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    try {
      return await this.makeRequest<Appointment[]>(API_CONFIG.ENDPOINTS.APPOINTMENTS);
    } catch (error) {
      if (DEV_CONFIG.MOCK_API && (error as Error).message.includes('Backend not available')) {
        return mockApiService.getAppointments();
      }
      throw error;
    }
  }

  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<Appointment> {
    try {
      return await this.makeRequest<Appointment>(API_CONFIG.ENDPOINTS.APPOINTMENTS, {
        method: 'POST',
        body: JSON.stringify(appointmentData),
      });
    } catch (error) {
      if (DEV_CONFIG.MOCK_API && (error as Error).message.includes('Backend not available')) {
        return mockApiService.createAppointment(appointmentData);
      }
      throw error;
    }
  }

  async updateAppointment(
    appointmentId: string,
    updateData: UpdateAppointmentRequest
  ): Promise<Appointment> {
    try {
      return await this.makeRequest<Appointment>(
        `${API_CONFIG.ENDPOINTS.APPOINTMENTS}/${appointmentId}`,
        {
          method: 'PUT',
          body: JSON.stringify(updateData),
        }
      );
    } catch (error) {
      if (DEV_CONFIG.MOCK_API && (error as Error).message.includes('Backend not available')) {
        return mockApiService.updateAppointment(appointmentId, updateData);
      }
      throw error;
    }
  }

  // AI methods
  async detectIntent(requestData: DialogflowRequest): Promise<DialogflowResponse> {
    try {
      return await this.makeRequest<DialogflowResponse>(API_CONFIG.ENDPOINTS.DIALOGFLOW, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
    } catch (error) {
      // Fallback to mock AI if Dialogflow has issues (like the Google Cloud credentials error)
      console.warn('Dialogflow error, using fallback AI:', (error as Error).message);
      return mockApiService.detectIntent();
    }
  }

  async summarizeTranscript(requestData: SummarizeRequest): Promise<SummarizeResponse> {
    try {
      return await this.makeRequest<SummarizeResponse>(API_CONFIG.ENDPOINTS.SUMMARIZE, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
    } catch (error) {
      // Fallback to mock if LLM service has issues
      console.warn('Summarization error, using fallback:', (error as Error).message);
      return mockApiService.summarizeTranscript();
    }
  }

  async generateAIResponse(requestData: GenerateAIRequest): Promise<GenerateAIResponse> {
    try {
      return await this.makeRequest<GenerateAIResponse>(API_CONFIG.ENDPOINTS.GENERATE, {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
    } catch (error) {
      // Fallback to mock if LLM service has issues
      console.warn('AI generation error, using fallback:', (error as Error).message);
      return mockApiService.generateAIResponse();
    }
  }
}

export const apiService = new ApiService();