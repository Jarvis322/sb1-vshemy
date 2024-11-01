import { createClient } from '@supabase/supabase-js';
import { User } from '../types/user';

// Use environment variables or fallback to demo values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test user data for demo purposes
export const TEST_USER: User = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  userSubscriptions: []
};

export const TEST_CREDENTIALS = {
  email: 'test',
  password: 'test'
};

// Helper function to simulate API delay
export const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
  if (error?.message?.includes('NetworkError')) {
    return 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.';
  }
  
  if (error?.message?.includes('not found')) {
    return 'İstek yapılan kaynak bulunamadı.';
  }

  return error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
};