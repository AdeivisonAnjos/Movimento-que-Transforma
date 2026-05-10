const SUPABASE_URL = "COLE_AQUI_SUA_PROJECT_URL";
const SUPABASE_KEY = "COLE_AQUI_SUA_ANON_OU_PUBLISHABLE_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const { data, error } = await supabaseClient
  .from("inscricoes")
  .insert([
    {
      protocolo: protocolo,
      status: totalInscricoes > LIMITE_VAGAS ? "Lista de espera" : "Inscrito",
      projeto: modalidade,
      nome_aluno: document.getElementById("nomeAluno").value,
      termo_aceite: true
    }
  ]);

if (error) {
  alert("Erro ao salvar inscrição: " + error.message);
  return;
}
