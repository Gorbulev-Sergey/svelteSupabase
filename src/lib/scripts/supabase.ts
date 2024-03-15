import { createClient } from "@supabase/supabase-js";

const project: string = 'https://qmbjbgvapzontrwkdpoc.supabase.co';
const key: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtYmpiZ3ZhcHpvbnRyd2tkcG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MjQ1MjQsImV4cCI6MjAyNjEwMDUyNH0.zaLiCppKPVcN_Y37uN9pk0O7edRckct1sIcQxD9Zagc';

export const supabase = createClient(project, key);