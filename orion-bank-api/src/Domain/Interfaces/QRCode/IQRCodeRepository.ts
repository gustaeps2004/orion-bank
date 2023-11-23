import { QRCodeContaRawQuery } from "../../../Domain/RawQuery/QRCodeContaRawQuery";
import { QRCode } from "../../../Domain/Entities/QRCode";

export interface IQRCodeRepository {
    BuscarQRCodePorEMV(emv: string, codigoContaOrigem: string): Promise<QRCodeContaRawQuery>
    SalvarQRCode(qrCode: QRCode): Promise<void>
}