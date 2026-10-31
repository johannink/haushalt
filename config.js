/*
  Zugangsdaten für den Abgleich zwischen Handy und PC.
  Beide Werte findest du in Supabase unter: Project Settings > API Keys.
  Der Schlüssel ist der "Publishable key" (beginnt mit sb_publishable_). Er darf in dieser Datei stehen,
  weil jede Person nur ihre eigenen Zeilen lesen und ändern kann (siehe setup.sql).
  NIEMALS den "service_role"- oder "secret"-Schlüssel hier eintragen.
*/
window.ABO_CONFIG = {
  url: '',      // z. B. 'https://abcdefghijkl.supabase.co'
  anonKey: ''   // z. B. 'sb_publishable_...'
};
