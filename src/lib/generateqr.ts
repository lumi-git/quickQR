import qrcode from 'qrcode-generator';


export const generateQRMatrix = (text: string) => {

  const qr = qrcode(0, 'L'); // 'L' denotes the error correction level
  qr.addData(text);
  qr.make();


  const qrMatrix = qr.getModuleCount() > 0 ? qr : null;


  const matrix = qrMatrix ? [...Array(qrMatrix.getModuleCount())].map((_, row) =>
    [...Array(qrMatrix.getModuleCount())].map((_, col) => qrMatrix.isDark(row, col) ? 1 : 0)
  ) : null;

  // Optionally convert the matrix to a data URL as png image
    const qrDataURL = qrMatrix ? qrMatrix.createDataURL(10, 0) : null;

  


  return { matrix, qrDataURL };
};