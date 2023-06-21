export interface Material {
  id?: string;
  uid?: string;
  path?: string;
  title?: string;
  name?: any;
  type?: string;
  state?: string;
  lockOwner?: any;
  lockCreated?: any;
  versionLabel?: any;
  isCheckedOut?: string;
  lastModified?: string;
  contextParameters?: ContextParameters;
  changeToken?: string;
  facets?: string[];
  parentRef?: string;
  retainUntil?: any;
  versionableId?: any;
  record?: boolean;
  locked?: boolean;
  lock?: any;
  proxy?: boolean;
  version?: boolean;
  trashed?: boolean;
  underRetentionOrLegalHold?: boolean;
  checkedOut?: boolean;
  'entity-type'?: string;
  repository?: string;
  properties?: Properties;
  isProxy?: boolean;
  isTrashed?: boolean;
  isRecord?: boolean;
  hasLegalHold?: boolean;
  isUnderRetentionOrLegalHold?: boolean;
  isVersion?: boolean;
}

export interface ContextParameters {}

export interface Properties {
  'uid:uid'?: any;
  'uid:major_version'?: number;
  'uid:minor_version'?: number;
  'thumb:thumbnail'?: ThumbThumbnail;
  'file:content'?: FileContent;
  'common:icon-expanded'?: any;
  'common:icon'?: string;
  'files:files'?: any[];
  'dc:description'?: string;
  'dc:language'?: any;
  'dc:coverage'?: any;
  'dc:valid'?: any;
  'dc:creator'?: string;
  'dc:modified'?: string;
  'dc:lastContributor'?: string;
  'dc:rights'?: any;
  'dc:expired'?: any;
  'dc:format'?: any;
  'dc:created'?: string;
  'dc:title'?: string;
  'dc:issued'?: any;
  'dc:nature'?: any;
  'dc:subjects'?: any[];
  'dc:contributors'?: string[];
  'dc:source'?: any;
  'dc:publisher'?: any;
  'fi:dt_elaboracao'?: any;
  'fi:assunto'?: any;
  'fi:dt_autuacao'?: any;
  'fi:titulo'?: any;
  'fi:sigilo'?: any;
  'fi:temporalidade'?: FiTemporalidade;
  'fi:usuario_criacao'?: any;
  'fi:metadados'?: any[];
  'fi:assinaturas'?: any[];
  'fi:uidSmartecm'?: any;
  'fi:tipo'?: any;
  'fi:assinaturas_conferentes'?: any[];
  'fi:metadados_index'?: any[];
  'fi:status'?: any;
  'relatedtext:relatedtextresources'?: any[];
  'nxtag:tags'?: Tag[];
}

export interface ThumbThumbnail {
  name?: string;
  'mime-type'?: string;
  encoding?: any;
  digestAlgorithm?: string;
  digest?: string;
  length?: string;
  data?: string;
}

export interface FileContent {
  name?: string;
  'mime-type'?: string;
  encoding?: any;
  digestAlgorithm?: string;
  digest?: string;
  length?: string;
  data?: string;
}

export interface FiTemporalidade {
  corrente?: any;
  codigo?: any;
  intermediario?: any;
  destino_final?: any;
  inicio?: any;
}

export interface Tag {
  label?: string;
  username?: string;
}
