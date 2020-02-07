export interface Semestre {
  id: number;
  titre: string;
  module: string[];
  siCourant: boolean;
  anneValidation: string;
  session: string;
}
