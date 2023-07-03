export function getFileType(fileName: string): string {
  // Obter a extensão do arquivo
  const fileExtension = fileName.split('.').pop().toLowerCase();

  // Mapear as extensões conhecidas para seus respectivos tipos de arquivo
  const fileTypes = {
    jpg: 'Imagem',
    jpeg: 'Imagem',
    png: 'Imagem',
    gif: 'Imagem',
    bmp: 'Imagem',
    svg: 'Imagem',
    pdf: 'PDF',
    doc: 'Documento do Word',
    docx: 'Documento do Word',
    xls: 'Planilha do Excel',
    xlsx: 'Planilha do Excel',
    ppt: 'Apresentação do PowerPoint',
    pptx: 'Apresentação do PowerPoint',
    txt: 'Arquivo de texto',
    csv: 'Arquivo CSV',
    zip: 'Arquivo compactado',
    rar: 'Arquivo compactado',
    tar: 'Arquivo compactado',
    gz: 'Arquivo compactado',
    // Adicione mais extensões e tipos de arquivo conforme necessário
  };

  // Verificar se a extensão é conhecida
  if (fileExtension in fileTypes) {
    return fileTypes[fileExtension];
  } else {
    return 'Tipo de arquivo desconhecido';
  }
}
export function getFileTypeByMIME(mimeType: string): string {
  if (mimeType) {
    // Mapear os MIME types conhecidos para seus respectivos tipos de arquivo
    const mimeTypes = {
      'image/jpeg': 'Imagem',
      'image/png': 'Imagem',
      'image/gif': 'Imagem',
      'image/bmp': 'Imagem',
      'image/svg+xml': 'Imagem',
      'application/pdf': 'PDF',
      'application/msword': 'Documento do Word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'Documento do Word',
      'application/vnd.ms-excel': 'Planilha do Excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'Planilha do Excel',
      'application/vnd.ms-powerpoint': 'Apresentação do PowerPoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        'Apresentação do PowerPoint',
      'text/plain': 'Arquivo de texto',
      'text/csv': 'Arquivo CSV',
      'application/zip': 'Arquivo compactado',
      'application/x-rar-compressed': 'Arquivo compactado',
      'application/x-tar': 'Arquivo compactado',
      'application/gzip': 'Arquivo compactado',
      // Adicione mais MIME types e tipos de arquivo conforme necessário
    };

    // Verificar se o MIME type é conhecido
    if (mimeType in mimeTypes) {
      return mimeTypes[mimeType];
    } else {
      return 'Tipo de arquivo desconhecido';
    }
  }
  return 'Tipo de arquivo desconhecido';
}
