// Minimal Database type for tables we use. Replace with `supabase gen types`
// output later for full type coverage.

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          address: string | null;
          plz: string | null;
          city: string | null;
          is_kleinunternehmer: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          address?: string | null;
          plz?: string | null;
          city?: string | null;
          is_kleinunternehmer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
        Relationships: [];
      };
      offers: {
        Row: {
          id: string;
          customer_id: string | null;
          offer_number: string;
          service: string;
          quantity: number;
          frequency: string;
          plz: string;
          tier: number | null;
          netto: number;
          mwst: number;
          brutto: number;
          is_kleinunternehmer: boolean;
          status: string;
          pdf_url: string | null;
          notes: string | null;
          created_at: string;
          valid_until: string | null;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          offer_number: string;
          service: string;
          quantity: number;
          frequency: string;
          plz: string;
          tier?: number | null;
          netto: number;
          mwst: number;
          brutto: number;
          is_kleinunternehmer?: boolean;
          status?: string;
          pdf_url?: string | null;
          notes?: string | null;
          created_at?: string;
          valid_until?: string | null;
        };
        Update: Partial<Database['public']['Tables']['offers']['Insert']>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          customer_id: string | null;
          offer_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          service: string;
          plz: string;
          quantity: number | null;
          price: number | null;
          scheduled_date: string | null;
          scheduled_time: string | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          offer_id?: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          service: string;
          plz: string;
          quantity?: number | null;
          price?: number | null;
          scheduled_date?: string | null;
          scheduled_time?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
