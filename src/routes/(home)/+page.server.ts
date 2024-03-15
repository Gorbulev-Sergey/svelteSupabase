import { supabase } from "$lib/scripts/supabase";

export async function load() {
    const { data } = await supabase.from('countries').select();
    return {
        countries: (data ?? []) as unknown as Array<{ id: Number, name: String }>,
    }
}