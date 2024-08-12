"use client";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./page.css";

export default function Home() {
  const [cnpj, setCnpj] = useState("");
  const [info, setInfo] = useState();
  const [modalInfo, setModalInfo] = useState({});
  const [checkedCnpj, setCheckedCnpj] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function getCnpj() {
    let formatedCnpj = cnpj.replace(/[^0-9]/g, "");
    if (formatedCnpj.length !== 14) return toast.error("CNPJ Inválido");

    try {
      setInfo();
      const res = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${formatedCnpj}`
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();

      let socios = [];
      if (data.qsa) {
        for (const item of data.qsa) {
          socios.push({
            nome: item.nome_socio,
            qualificacao: item.qualificacao_socio,
            faixaEtaria: item.faixa_etaria,
          });
        }
      }

      setInfo({
        nome: data.nome_fantasia,
        razaoSocial: data.razao_social,
        dataAbertura: data.data_inicio_atividade,
        situacao: data.situacao_cadastral,
        atividadePrincipal: data.cnae_fiscal_descricao,
        tipoLogradouro: data.descricao_tipo_de_logradouro,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cep: data.cep,
        municipio: data.municipio,
        uf: data.uf,
        telefone: data.ddd_telefone_1,
        email: data.email,
        socios,
      });

      setCheckedCnpj(
        data.cnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        )
      );
      setCnpj("");

      return toast.success("CNPJ Válido");
    } catch (error) {
      return toast.error("Algo de errado aconteceu");
    }
  }

  const openModal = () => {
    setModalInfo(info);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalInfo();
    setModalOpen(false);
  };

  const saveInfo = () => {
    setInfo(modalInfo);
    setModalOpen(false);
  };

  const sendInfo = () => {
    toast.success("Informações atualizadas com sucesso!");
    setInfo();
    setCheckedCnpj("");
    console.log(info);
  };

  return (
    <div className="wrapper">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="checkContainer">
        <h1>Consulta CNPJ</h1>
        <div className="formGroup">
          <input
            value={cnpj}
            className="formInput"
            onChange={(e) => setCnpj(e.target.value)}
          />
          <button
            className="consultButton"
            disabled={!cnpj}
            onClick={() => getCnpj()}
          >
            Consulta
          </button>
        </div>
      </div>
      {info ? (
        <div className="resultsContainer">
          <div className="viewItem">
            <h3 className="cnpjChecked">CNPJ: {checkedCnpj}</h3>
          </div>
          <div className="sessionTitle">
            <h2>Informações Gerais</h2>
            <button className="editButton" onClick={() => openModal()}>
              Editar
            </button>
          </div>
          <div className="viewContainer">
            <div className="viewItem">
              <p>
                <strong>Nome:</strong> {info.nome}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Razão social:</strong> {info.razaoSocial}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Data de abertura:</strong> {info.dataAbertura}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Situação:</strong> {info.situacao}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Atividade principal:</strong> {info.atividadePrincipal}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Telefone:</strong> {info.telefone}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Email:</strong> {info.email}
              </p>
            </div>
          </div>
          <div className="sessionTitle">
            <h2 className="title">Endereço</h2>
            <button className="editButton" onClick={() => openModal()}>
              Editar
            </button>
          </div>
          <div className="viewContainer">
            <div className="viewItem">
              <p>
                <strong>Tipo logradouro:</strong> {info.tipoLogradouro}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Logradouro:</strong> {info.logradouro}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Numero:</strong> {info.numero}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Complemento:</strong> {info.complemento}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Bairro:</strong> {info.bairro}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>CEP:</strong> {info.cep}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Município:</strong> {info.municipio}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>UF:</strong> {info.uf}
              </p>
            </div>
          </div>
          {info.socios && (
            <>
              <div className="sessionTitle">
                <h2 className="title">Sócios</h2>
              </div>
              <div className="partnerContainer">
                {info.socios.map((item) => (
                  <div className="partnerItem">
                    <div className="viewItem">
                      <p>
                        <strong>Nome:</strong> {item.nome}
                      </p>
                    </div>
                    <div className="viewItem">
                      <p>
                        <strong>Qualificação:</strong> {item.qualificacao}
                      </p>
                    </div>
                    <div className="viewItem">
                      <p>
                        <strong>Faixa etária:</strong> {item.faixaEtaria}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="buttonContainer">
            <button onClick={() => sendInfo()}>Confirmar</button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {modalOpen && <div className="blockContainer" />}
      {modalOpen && (
        <div className="modalContainer">
          <h1>Edição</h1>
          <h2>Informações Gerais</h2>
          <div className="modalInputsContainer">
            <div className="formGroup">
              <label className="formLabel">Nome</label>
              <input
                value={modalInfo.nome}
                className="formInput"
                type="text"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, nome: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Razão Social</label>
              <input
                value={modalInfo.razaoSocial}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, razaoSocial: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Data de Abertura</label>
              <input
                value={modalInfo.dataAbertura}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, dataAbertura: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Situação</label>
              <input
                value={modalInfo.situacao}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, situacao: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Atividade Principal</label>
              <input
                value={modalInfo.atividadePrincipal}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({
                    ...modalInfo,
                    atividadePrincipal: e.target.value,
                  })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Telefone</label>
              <input
                value={modalInfo.telefone}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, telefone: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Email</label>
              <input
                value={modalInfo.email}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, email: e.target.value })
                }
              />
            </div>
          </div>
          <h2>Endereço</h2>
          <div className="modalInputsContainer">
            <div className="formGroup">
              <label className="formLabel">Tipo</label>
              <input
                value={modalInfo.tipoLogradouro}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, tipoLogradouro: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Logradouro</label>
              <input
                value={modalInfo.logradouro}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, logradouro: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Nº</label>
              <input
                value={modalInfo.numero}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, numero: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Complemento</label>
              <input
                value={modalInfo.complemento}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, complemento: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Bairro</label>
              <input
                value={modalInfo.bairro}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, bairro: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">CEP</label>
              <input
                value={modalInfo.cep}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, cep: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Cidade</label>
              <input
                value={modalInfo.municipio}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, municipio: e.target.value })
                }
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">UF</label>
              <input
                value={modalInfo.uf}
                className="formInput"
                onChange={(e) =>
                  setModalInfo({ ...modalInfo, uf: e.target.value })
                }
              />
            </div>
          </div>
          <div className="modalButtonContainer">
            <button className="cancelButton" onClick={() => closeModal()}>
              Cancelar
            </button>
            <button onClick={() => saveInfo()}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
}
