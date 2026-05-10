const SUPABASE_URL = "https://movimento-que-transforma.vercel.app/";
const SUPABASE_KEY = "sb_publishable_U4B_BYUnAHDKdWsDe7-7cQ_wI0D6Vob";

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
