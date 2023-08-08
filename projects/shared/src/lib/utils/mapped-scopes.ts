import { Role } from '../enums/roles.enum';
import { ScopesEmum } from '../enums/scopes.enum';

export function mappedScope(list: string[]): string {
  let roles = list.filter(
    (res) => res.includes('MATERIAL_APOIO') && !res.includes('USER')
  );
  // roles = [...roles, 'MATERIAL_APOIO_ADMIN', 'MATERIAL_APOIO_SAUDE'];

  if (roles.includes(Role.ADMIN) || roles.length > 1) {
    return ScopesEmum.GERAL;
  }

  for (const role of roles) {
    switch (role) {
      case Role.ORCAMENTO:
        return ScopesEmum.ORCAMENTO;
      case Role.SAUDE:
        return ScopesEmum.SAUDE;
      case Role.LOGISTICA:
        return ScopesEmum.LOGISTICA;
      case Role.EDUCACAO:
        return ScopesEmum.EDUCACAO;
    }
  }

  return ScopesEmum.GERAL; // Caso não haja nenhuma correspondência, retorna o escopo padrão.
}
