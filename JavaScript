const SUPABASE_URL = "https://vvbbhvccbfhmpkbyqvdn.supabase.co";
const SUPABASE_KEY = "sb_publishable_yu9Uwwm4cmiwSPuauaNJrg_OCz2bW_i";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const LIMITE_VAGAS = 50;
    let totalInscricoes = Number(localStorage.getItem("totalInscricoesMovimento")) || 0;

    function mostrarTela(id) {
      document.querySelectorAll(".screen").forEach(tela => {
        tela.classList.remove("active");
      });
      document.getElementById(id).classList.add("active");
      window.scrollTo(0, 0);
    }

    function atualizarCamposProjeto() {
      const modalidade = document.getElementById("modalidade").value;

      const camposEsporte = document.getElementById("camposEsporte");
      const camposReforco = document.getElementById("camposReforco");
      const camposMusica = document.getElementById("camposMusica");
      const parqArea = document.getElementById("parqArea");

      camposEsporte.classList.add("hidden");
      camposReforco.classList.add("hidden");
      camposMusica.classList.add("hidden");

      if (modalidade === "Futsal" || modalidade === "Vôlei" || modalidade === "Judô") {
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

    document.getElementById("inscricaoForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const modalidade = document.getElementById("modalidade").value;
      const termo = document.getElementById("termo");

      if (!modalidade) {
        alert("Selecione o projeto desejado.");
        return;
      }

      if (modalidade === "Reforço Escolar") {
        const serie = document.getElementById("serie").value;
        const disciplina = document.getElementById("disciplina").value;

        if (!serie || !disciplina) {
          alert("Para Reforço Escolar, informe a série e a disciplina.");
          return;
        }
      }

      if (!termo.checked) {
        alert("Para finalizar a inscrição, é obrigatório aceitar o termo.");
        return;
      }

      totalInscricoes++;
      localStorage.setItem("totalInscricoesMovimento", totalInscricoes);

      const protocolo = "MT-" + new Date().getFullYear() + "-" + String(totalInscricoes).padStart(4, "0");
      document.getElementById("protocoloNumero").innerText = protocolo;

      if (totalInscricoes > LIMITE_VAGAS) {
        document.getElementById("mensagemStatus").innerHTML = "Cadastro realizado em <span>lista de espera!</span>";
      } else {
        document.getElementById("mensagemStatus").innerHTML = "Inscrição realizada <span>com sucesso!</span>";
      }

      this.reset();
      atualizarCamposProjeto();
      mostrarTela("final");
    });
