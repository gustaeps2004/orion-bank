

export interface Movimento {
    ID: number;
    Codigo: string;
    CodigoContaOrigem: string;
    CodigoContaDestino: string;
    Valor: number;
    Chave_Pix: string;
    EMV: string;
    InfoAdicional: string;
    DescMovimento: string;
    TipoTransacao: number;
    DtMovimento: Date;
}
