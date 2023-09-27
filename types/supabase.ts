export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Profile = {id: string, display_name: string, profile_picture: string};

export interface Database {
  public: {
    Tables: {
      memberships: {
        Row: {
          id: number
          room_id: number
          user_id: string
        }
        Insert: {
          id?: number
          room_id: number
          user_id: string
        }
        Update: {
          id?: number
          room_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memberships_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          display_name: string
          id: string
          profile_picture: string | null
        }
        Insert: {
          display_name: string
          id: string
          profile_picture?: string | null
        }
        Update: {
          display_name?: string
          id?: string
          profile_picture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          id: number
          name: string
          owner_id: string
        }
        Insert: {
          id?: number
          name: string
          owner_id: string
        }
        Update: {
          id?: number
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
