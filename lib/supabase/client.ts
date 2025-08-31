import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types will be generated from Supabase
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          subcategory: string | null;
          images: string[];
          materials: string[];
          gemstones: string[];
          in_stock: boolean;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      bookings: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          consultation_type: string;
          location: string;
          date: string;
          time_slot: string;
          notes: string | null;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          customer_email: string;
          customer_name: string;
          customer_phone: string | null;
          shipping_address: object;
          billing_address: object;
          items: object[];
          subtotal: number;
          tax: number;
          shipping: number;
          total: number;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_intent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      newsletter: {
        Row: {
          id: string;
          email: string;
          subscribed: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['newsletter']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['newsletter']['Insert']>;
      };
    };
  };
};