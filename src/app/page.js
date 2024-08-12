"use client";
import { useState } from "react";
import "./page.css";

export default function Home() {
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [situacao, setSituacao] = useState("");
  const [atividadePrincipal, setAtividadePrincipal] = useState("");
  const [tipoLogradouro, setTipoLogradouro] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [uf, setUf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [modalOpen, setModal] = useState(false);

  async function getCnpj() {
    if (!cnpj) return console.log("invalid CNPJ");
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();
    setNome(data.nome_fantasia);
    setRazaoSocial(data.razao_social);
    setDataAbertura(data.data_inicio_atividade);
    setSituacao(data.situacao_cadastral);
    setAtividadePrincipal(data.cnae_fiscal_descricao);
    setTipoLogradouro(data.descricao_tipo_de_logradouro);
    setLogradouro(data.logradouro);
    setNumero(data.numero);
    setComplemento(data.complemento);
    setBairro(data.bairro);
    setCep(data.cep);
    setMunicipio(data.municipio);
    setUf(data.uf);
    setTelefone(data.ddd_telefone_1);
    setEmail(data.email);

    console.log(data);

    return;
  }

  const sendInfo = () => {
    let newInfo = {
      nome,
      razaoSocial,
      dataAbertura,
      situacao,
      atividadePrincipal,
      tipoLogradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      municipio,
      uf,
      telefone,
      email,
    };
    console.log(newInfo);
  };

  return (
    <div className="wrapper">
      <div className="checkContainer">
        <h1>Consulta CNPJ</h1>
        <div className="formGroup">
          <input
            value={cnpj}
            className="formInput"
            onChange={(e) => setCnpj(e.target.value)}
          />
          <button className="consultButton" onClick={() => getCnpj()}>
            Consulta
          </button>
        </div>
      </div>
      {razaoSocial ? (
        <div className="resultsContainer">
          <div className="viewItem">
            <h3 className="cnpjChecked">CNPJ: {cnpj}</h3>
          </div>
          <h2 className="title">Informações Gerais</h2>
          <div className="viewContainer">
            <div className="viewItem">
              <p>
                <strong>Nome:</strong> {nome ? nome : "-"}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Razão social:</strong> {razaoSocial}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Data de abertura:</strong> {dataAbertura}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Situação:</strong> {situacao}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Atividade principal:</strong> {atividadePrincipal}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Telefone:</strong> {telefone}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
          </div>
          <h2 className="title">Endereço</h2>
          <div className="viewContainer">
            <div className="viewItem">
              <p>
                <strong>Tipo logradouro:</strong> {tipoLogradouro}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Logradouro:</strong> {logradouro}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Numero:</strong> {numero}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Complemento:</strong> {complemento}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Bairro:</strong> {bairro}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>CEP:</strong> {cep}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>Município:</strong> {municipio}
              </p>
            </div>
            <div className="viewItem">
              <p>
                <strong>UF:</strong> {uf}
              </p>
            </div>
          </div>
          <div className="buttonContainer">
            <button onClick={() => setModal(true)}>Editar</button>
            <button>Confirmar</button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {modalOpen && <div className="blockContainer" />}
      {modalOpen && (
        <div className="modalContainer">
          <h1 className="modalSectionTitle">Edição</h1>
          <h2 className="modalSectionTitle">Informações Gerais</h2>
          <div className="modalInputsContainer">
            <div className="formGroup">
              <label className="formLabel">Nome</label>
              <input
                value={nome}
                className="formInput"
                type="text"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Razão Social</label>
              <input
                value={razaoSocial}
                className="formInput"
                onChange={(e) => setRazaoSocial(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Data de Abertura</label>
              <input
                value={dataAbertura}
                className="formInput"
                onChange={(e) => setDataAbertura(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Situação</label>
              <input
                value={situacao}
                className="formInput"
                onChange={(e) => setSituacao(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Atividade Principal</label>
              <input
                value={atividadePrincipal}
                className="formInput"
                onChange={(e) => setAtividadePrincipal(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Telefone</label>
              <input
                value={telefone}
                className="formInput"
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Email</label>
              <input
                value={email}
                className="formInput"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <h2 className="modalSectionTitle">Endereço</h2>
          <div className="modalInputsContainer">
            <div className="formGroup">
              <label className="formLabel">Tipo</label>
              <input
                value={tipoLogradouro}
                className="formInput"
                onChange={(e) => setTipoLogradouro(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Logradouro</label>
              <input
                value={logradouro}
                className="formInput"
                onChange={(e) => setLogradouro(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Nº</label>
              <input
                value={numero}
                className="formInput"
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Complemento</label>
              <input
                value={complemento}
                className="formInput"
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Bairro</label>
              <input
                value={bairro}
                className="formInput"
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">CEP</label>
              <input
                value={cep}
                className="formInput"
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">Cidade</label>
              <input
                value={municipio}
                className="formInput"
                onChange={(e) => setMunicipio(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel">UF</label>
              <input
                value={uf}
                className="formInput"
                onChange={(e) => setUf(e.target.value)}
              />
            </div>
          </div>
          <button className="saveButton" onClick={() => setModal(false)}>
            Salvar
          </button>
        </div>
      )}
      {/* <button onClick={() => setModal(true)}>Consulta</button> */}
      {/* <button onClick={() => sendInfo()}>Consulta</button> */}
    </div>
  );
}
