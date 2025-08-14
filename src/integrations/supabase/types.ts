export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      app: {
        Row: {}
        Insert: {}
        Update: {}
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          name: string
          path: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name: string
          path: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          path?: string
        }
        Relationships: []
      }
      login: {
        Row: {
          created_at: string
          id: number
          login: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          login?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          login?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      product_features: {
        Row: {
          created_at: string | null
          feature: string
          id: string
          product_id: string
        }
        Insert: {
          created_at?: string | null
          feature: string
          id?: string
          product_id: string
        }
        Update: {
          created_at?: string | null
          feature?: string
          id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_features_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          product_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          product_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          bulb_type: string | null
          created_at: string | null
          delivery_time: string | null
          description: string | null
          energy_rating: string | null
          id: string
          material: string | null
          name: string
          price: number
          status: string | null
          subcategory_id: string
          vendor_id: string | null
        }
        Insert: {
          bulb_type?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          energy_rating?: string | null
          id?: string
          material?: string | null
          name: string
          price: number
          status?: string | null
          subcategory_id: string
          vendor_id?: string | null
        }
        Update: {
          bulb_type?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          energy_rating?: string | null
          id?: string
          material?: string | null
          name?: string
          price?: number
          status?: string | null
          subcategory_id?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          kyc_approved_at: string | null
          kyc_status: Database["public"]["Enums"]["kyc_status"] | null
          kyc_submitted_at: string | null
          last_name: string | null
          phone: string | null
          subscription_end_date: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          kyc_approved_at?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          kyc_submitted_at?: string | null
          last_name?: string | null
          phone?: string | null
          subscription_end_date?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          kyc_approved_at?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          kyc_submitted_at?: string | null
          last_name?: string | null
          phone?: string | null
          subscription_end_date?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string
          id: string
          ip_address: unknown | null
          operation: string
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          operation: string
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: unknown | null
          operation?: string
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subcategories: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          name: string
          path: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name: string
          path: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price_monthly: number
          price_yearly: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price_monthly: number
          price_yearly?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_monthly?: number
          price_yearly?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vendor_kyc: {
        Row: {
          bank_account_holder_name: string
          bank_account_number: string
          bank_ifsc_code: string
          bank_proof_url: string | null
          created_at: string
          gstin: string | null
          gstin_proof_url: string | null
          id: string
          pan: string
          pan_proof_url: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["kyc_status"]
          submitted_at: string | null
          udyam_proof_url: string | null
          udyam_registration: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bank_account_holder_name: string
          bank_account_number: string
          bank_ifsc_code: string
          bank_proof_url?: string | null
          created_at?: string
          gstin?: string | null
          gstin_proof_url?: string | null
          id?: string
          pan: string
          pan_proof_url?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["kyc_status"]
          submitted_at?: string | null
          udyam_proof_url?: string | null
          udyam_registration?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bank_account_holder_name?: string
          bank_account_number?: string
          bank_ifsc_code?: string
          bank_proof_url?: string | null
          created_at?: string
          gstin?: string | null
          gstin_proof_url?: string | null
          id?: string
          pan?: string
          pan_proof_url?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["kyc_status"]
          submitted_at?: string | null
          udyam_proof_url?: string | null
          udyam_registration?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vendor_subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string
          end_date: string | null
          id: string
          plan_id: string
          razorpay_customer_id: string | null
          razorpay_subscription_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id: string
          razorpay_customer_id?: string | null
          razorpay_subscription_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id?: string
          razorpay_customer_id?: string | null
          razorpay_subscription_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      log_security_event: {
        Args: {
          operation_name: string
          user_id_param?: string
          success_param?: boolean
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      kyc_status: "pending" | "submitted" | "approved" | "rejected"
      subscription_status: "active" | "inactive" | "trial" | "expired"
      user_type: "architect" | "designer" | "vendor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      kyc_status: ["pending", "submitted", "approved", "rejected"],
      subscription_status: ["active", "inactive", "trial", "expired"],
      user_type: ["architect", "designer", "vendor"],
    },
  },
} as const
