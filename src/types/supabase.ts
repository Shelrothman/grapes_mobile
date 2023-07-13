export type Json =
    | string
    | number
    | boolean
    | null
    | { [ key: string ]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            shared_letters: {
                Row: {
                    created_at: string | null
                    id: string
                    letter: string
                    user_id: string
                    value: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    letter?: string
                    user_id: string
                    value?: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    letter?: string
                    user_id?: string
                    value?: string
                }
                Relationships: []
            }
        }
        Views: {
            [ _ in never ]: never
        }
        Functions: {
            [ _ in never ]: never
        }
        Enums: {
            [ _ in never ]: never
        }
        CompositeTypes: {
            [ _ in never ]: never
        }
    }
}
