interface Abuser {
  dob: string;
  headPhoto?: string;
  address?: string;
  alias?: string | null;
  name: string;
  offenses?: {
    convictionDate: string;
    counts: number;
    expiresFromRegistry: string;
    judgement: string;
    offenseDescription: string;
  }[];
}
