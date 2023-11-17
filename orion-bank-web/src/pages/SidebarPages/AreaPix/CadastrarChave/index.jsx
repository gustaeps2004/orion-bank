import React, { useState, useContext, useEffect } from "react";
import { ChaveContext } from "../../../../contexts/ChaveContext";
import { TipoChavePixEnum } from '../../../../constants/enums';
import NotFound from "../../../../assets/img/undraw_stars.svg";
import { showErrorNotification } from '../../../../shared/notificationUtils';
import Key from "../../../../assets/img/key.svg";
import Trash from '../../../../assets/img/trash.svg'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import "./styles.css"

const CadastrarChave = () => {
    const chaveContext = useContext(ChaveContext);
    const criarChavePix = chaveContext.criarChavePix;
    const obterChavesPix = chaveContext.obterChavesPix;
    const inativarChavePix = chaveContext.inativarChavePix;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chaves, setChaves] = useState([]);
    const [tamanho, setTamanho] = useState(11);

    const [cadastrarChavePix, setCadastrarChavePix] = useState({ codigoConta: "", chavePix: "", tipoChave: 1 });

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validarChavePix();

        if (isValid) {
            criarChavePix(cadastrarChavePix);
            limparCampos();
            closeModal();
        }
    };

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    function validarChavePix() {

        if (cadastrarChavePix.chavePix === "") {
            showErrorNotification(`Informe uma Chave Pix`);
            return false;
        }

        switch (cadastrarChavePix.tipoChave) {
            case TipoChavePixEnum.CPF:

                break;
            case TipoChavePixEnum.EMAIL:
                if (!validarEmail(cadastrarChavePix.chavePix)) {
                    showErrorNotification(`Informe um e-mail válido.`);
                    return false;
                }
                break;
            case TipoChavePixEnum.TELEFONE:

                break;
            case TipoChavePixEnum.EVP:

                break;

            default:
                break;
        }

        return true;
    }

    function mudarTamanho(tipoChave) {

        switch (tipoChave) {
            case TipoChavePixEnum.CPF:
            case TipoChavePixEnum.TELEFONE:
                setTamanho(11);
                break;

            default:
                setTamanho(200);
                break;
        }
        limparCampos();
    }

    function limparCampos() {
        cadastrarChavePix.chavePix = "";
    }
    const buscarChaves = async () => {
        const response = await obterChavesPix();
        if (response !== undefined) {
            setChaves(response);
        }
    }

    useEffect(() => {
        buscarChaves();
    }, []);

    function formatarEnum(situacao) {
        switch (situacao) {
            case TipoChavePixEnum.CPF:
                return 'CPF';
            case TipoChavePixEnum.EMAIL:
                return 'Email';
            case TipoChavePixEnum.TELEFONE:
                return 'Telefone';
            case TipoChavePixEnum.EVP:
                return 'EVP';
            default:
                return 'Desconhecida';
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const excluirChave = (codigoChave) => {
      inativarChavePix(codigoChave);
      buscarChaves();
    };

    return (
        <div className="container-cadastrar">
            <div className="title-solicitar">
                <h3 className="titulo-h5"> <img src={Key}></img> Cadastrar Chave</h3>
            </div>
            <div className="card-cadastrar">

                <Modal show={modalIsOpen} centered >
                    <Modal.Header>
                        <Modal.Title>Cadastrar nova chave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-cadastro">

                            <select
                                id="tipoDeChave"
                                name="tipoDeChave"
                                className="form-control campo-cadastro"
                                value={cadastrarChavePix.tipoChave}
                                onChange={(e) => {
                                    setCadastrarChavePix({ ...cadastrarChavePix, tipoChave: parseInt(e.target.value, 10) });
                                    mudarTamanho(parseInt(e.target.value, 10));
                                }}
                            >
                                {Object.values(TipoChavePixEnum).map((tipo, index) => (
                                    <option
                                        key={index}
                                        value={tipo}
                                        onChange={(e) => {

                                        }}
                                    >
                                        {formatarEnum(tipo)}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                className="chavePix form-control"
                                id="chavePix"
                                placeholder="Chave"
                                name="nome"
                                maxLength={tamanho}
                                value={cadastrarChavePix.chavePix}
                                onChange={(e) => setCadastrarChavePix({ ...cadastrarChavePix, chavePix: e.target.value })}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={handleSubmit} variant="success">
                            Criar
                        </Button>
                        <Button variant="danger" onClick={closeModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div>
                    <h2 style={{ color: '#DB4648' }}>Minhas chaves Pix</h2>
                </div>
                <div className="div-descricao">
                    <h5 className="titulo-chaves">Com suas chaves, você pode receber Pix através de QR codes ou links e se identificar de forma rápida para receber transferências.</h5>
                </div>

                <Button onClick={openModal} id="button-cadastrar" variant="secondary" className="button-add-chave" as="input" type="submit" value="+ Cadastrar chave" />

                <div className="table-consulta-chave">
                    <Table hover responsive className="table-cadastra-chave">
                        <thead>
                            <tr>
                                <th className="hidden">Codigo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chaves.map((record, index) => (
                                <tr key={index} >
                                    <td className="hidden">{record.Codigo}</td>
                                    <td>
                                        <div className="tipo-chave">
                                            <span><strong>{formatarEnum(record.TipoChave)}</strong></span>
                                        </div>
                                        <div className="valor-chave">
                                            <span>{record.Chave_Pix}</span>
                                        </div>
                                    </td>
                                    <td>

                                        <img style={{cursor: 'pointer'}} onClick={() => excluirChave(record.Codigo)} src={Trash}></img>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {chaves.length === 0 && (
                    <div>
                        <img src={NotFound}></img>
                        <h5 className="mt-3" style={{ color: "#3f3d56" }}>Você ainda não possui chaves cadastradas.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CadastrarChave;