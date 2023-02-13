import { COMPANY_REPOSITORY } from "../../constants";
import { Company } from "../../entities/company.model";

export const CompanyProviders = [{
    provide: COMPANY_REPOSITORY,
    useValue: Company,
}];
