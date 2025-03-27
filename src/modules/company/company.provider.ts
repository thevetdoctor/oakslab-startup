import { Company } from 'src/entities';
import { COMPANY_REPOSITORY } from 'src/utils';

export const CompanyProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: Company,
  },
];
