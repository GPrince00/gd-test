"use client";
import { useState } from "react";

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

    setCnpj("");
    return Response.json({ data });
  }

  return (
    <div>
      <h1>Consulta CNPJ</h1>
      <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      <button onClick={() => getCnpj()}>Consulta</button>
    </div>
  );
}
