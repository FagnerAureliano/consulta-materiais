import { Role } from "../enums/roles.enum";
import { Scopes } from "../enums/scopes.enum";

export function mappedScope(list:string[]): string {
    let roles = list.filter(
      (res) => res.includes('MATERIAL_APOIO') && !res.includes('USER')
      );
      // roles = [...roles, 'MATERIAL_APOIO_ADMIN', 'MATERIAL_APOIO_SAUDE'];
  
    if (roles.includes(Role.ADMIN) || roles.length > 1) {
      return Scopes.GERAL;
    }
  
    for (const role of roles) {
      switch (role) {
        case Role.ORCAMENTO:
          return Scopes.ORCAMENTO;
        case Role.SAUDE:
          return Scopes.SAUDE;
        case Role.LOGISTICA:
          return Scopes.LOGISTICA;
        case Role.EDUCACAO:
          return Scopes.EDUCACAO;
      }
    }
  
    return Scopes.GERAL; // Caso não haja nenhuma correspondência, retorna o escopo padrão.
  }