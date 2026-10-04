import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CakeCategory = "birthdays" | "weddings" | "everyday";

export interface Cake {
  id: string;
  name: string;
  price: number;
  description: string | null;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
  category: CakeCategory;
}

export const useCakes = () =>
  useQuery({
    queryKey: ["cakes"],
    queryFn: async (): Promise<Cake[]> => {
      const { data, error } = await supabase
        .from("cakes")
        .select("id,name,price,description,image_url,featured,sort_order,category")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Cake[];
    },
  });
