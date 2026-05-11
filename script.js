const SUPABASE_URL = "https://vvbbhvccbfhmpkbyqvdn.supabase.co";
const SUPABASE_KEY = "sb_publishable_yu9Uwwm4cmiwSPuauaNJrg_OCz2bW_i";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const LIMITE_VAGAS = 50;

const { error } = await supabaseClient
  .from("inscricoes")
  .insert({
    protocolo: protocolo,
    status:
      modalidade === "Judô" || totalInscricoes > LIMITE_VAGAS
        ? "Lista de espera"
        : "Inscrito",
    projeto: modalidade,
    nome_aluno: document.getElementById("nomeAluno")?.value || "",
    idade: Number(document.querySelector('input[type="number"]')?.value),
    nome_responsavel:
      document.querySelectorAll('input[type="text"]')[1]?.value || "",
    telefone_contato: document.querySelector('input[type="tel"]')?.value || "",
    serie: document.getElementById("serie")?.value || null,
    disciplina: document.getElementById("disciplina")?.value || null,
    escola: document.getElementById("escola")?.value || null,
    horario_estudo: document.getElementById("horarioEstudo")?.value || null,
    termo_aceite: true,
  });

if (error) {
  alert("Erro ao salvar no Supabase: " + error.message);
  console.log(error);
  return;
}

let totalInscricoes =
  Number(localStorage.getItem("totalInscricoesMovimento")) || 0;

function mostrarTela(id) {
  document.querySelectorAll(".screen").forEach((tela) => {
    tela.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  window.scrollTo(0, 0);
}

function atualizarCamposProjeto() {
  const modalidade = document.getElementById("modalidade").value;

  const avisoJudo = document.getElementById("avisoJudo");

  if (modalidade === "Judô") {
    avisoJudo.classList.remove("hidden");
  } else {
    avisoJudo.classList.add("hidden");
  }

  const camposEsporte = document.getElementById("camposEsporte");
  const camposReforco = document.getElementById("camposReforco");
  const camposMusica = document.getElementById("camposMusica");
  const parqArea = document.getElementById("parqArea");

  camposEsporte.classList.add("hidden");
  camposReforco.classList.add("hidden");
  camposMusica.classList.add("hidden");

  if (
    modalidade === "Futsal" ||
    modalidade === "Vôlei" ||
    modalidade === "Judô"
  ) {
    camposEsporte.classList.remove("hidden");
    parqArea.classList.remove("hidden");
  } else if (modalidade === "Reforço Escolar") {
    camposReforco.classList.remove("hidden");
    parqArea.classList.add("hidden");
  } else if (modalidade === "Música") {
    camposMusica.classList.remove("hidden");
    parqArea.classList.add("hidden");
  } else {
    parqArea.classList.remove("hidden");
  }
}

document
  .getElementById("inscricaoForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const modalidade = document.getElementById("modalidade").value;

    const termo = document.getElementById("termo");

    if (!modalidade) {
      alert("Selecione o projeto desejado.");
      return;
    }

    // REFORÇO ESCOLAR
    if (modalidade === "Reforço Escolar") {
      const serie = document.getElementById("serie")?.value;

      const disciplina = document.getElementById("disciplina")?.value;

      const horarioEstudo =
        document.getElementById("horarioEstudo")?.value;

      if (!serie || !disciplina || !horarioEstudo) {
        alert(
          "Para Reforço Escolar, informe a série, a disciplina e o horário que a criança estuda."
        );
        return;
      }
    }

    if (!termo.checked) {
      alert(
        "Para finalizar a inscrição, é obrigatório aceitar o termo."
      );
      return;
    }

    totalInscricoes++;

    localStorage.setItem(
      "totalInscricoesMovimento",
      totalInscricoes
    );

    const protocolo =
      "MT-" +
      new Date().getFullYear() +
      "-" +
      String(totalInscricoes).padStart(4, "0");

const { error } = await supabaseClient
  .from("inscricoes")
  .insert({
    protocolo: protocolo,
    status:
      modalidade === "Judô" || totalInscricoes > LIMITE_VAGAS
        ? "Lista de espera"
        : "Inscrito",
    projeto: modalidade,
    nome_aluno: document.getElementById("nomeAluno")?.value || "",
    idade: Number(document.querySelector('input[type="number"]')?.value),
    nome_responsavel:
      document.querySelectorAll('input[type="text"]')[1]?.value || "",
    telefone_contato: document.querySelector('input[type="tel"]')?.value || "",
    serie: document.getElementById("serie")?.value || null,
    disciplina: document.getElementById("disciplina")?.value || null,
    escola: document.getElementById("escola")?.value || null,
    horario_estudo: document.getElementById("horarioEstudo")?.value || null,
    termo_aceite: true,
  });

if (error) {
  alert("Erro ao salvar no Supabase: " + error.message);
  console.log(error);
  return;
}

    document.getElementById("protocoloNumero").innerText =
      protocolo;

    if (
      modalidade === "Judô" ||
      totalInscricoes > LIMITE_VAGAS
    ) {
      document.getElementById(
        "mensagemStatus"
      ).innerHTML =
        "Cadastro realizado em <span>lista de espera!</span>";
    } else {
      document.getElementById(
        "mensagemStatus"
      ).innerHTML =
        "Inscrição realizada <span>com sucesso!</span>";
    }

    this.reset();

    atualizarCamposProjeto();

    mostrarTela("final");
  });
