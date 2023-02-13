import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPOSITORY } from '../../constants';
import { Company } from '../../entities/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyModel: typeof Company,
    ) {}
  
    async findOneById(id: string): Promise<Company> {
      const company = await this.companyModel.findOne({
        where: {
          id
        }
      });
      return company?.['dataValues'];
    }

    async findOneByName(name: string): Promise<Company> {
      const company = await this.companyModel.findOne({
        where: {
          name
        }
      });
      return company?.['dataValues'];
  }

    async findAllCompanies(): Promise<Company[]> {
      const companies = await this.companyModel.findAll();
      return companies || null
  }

    async createCompany(payload): Promise<Company> {
      return await this.companyModel.create(payload);
    }
}
