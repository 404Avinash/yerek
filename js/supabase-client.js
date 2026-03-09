// YAKUZAZ — Shared Supabase Client
// Included before any page-specific scripts via:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="/js/supabase-client.js"></script>

const SUPABASE_URL = 'https://bhmpsgldivlnooqndutq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobXBzZ2xkaXZsbm9vcW5kdXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjUyMDEsImV4cCI6MjA4ODU0MTIwMX0.Qr9-qjUQcTeT8PBjBqEHT4_6HAXjEphBAcpdse6Sa_4';

const _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
