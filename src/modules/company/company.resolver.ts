import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './dto/company.dto';
import { Company } from '../../entities/company.model';

@Resolver()
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService) {}

    @Query(() => [Company])
    async getCompanies(payload: string | any): Promise<Company[]> {
      if (payload) {
        const company = await this.companyService.findOneById(payload.id);
        return [company];
      }
      const companies = await this.companyService.findAllCompanies();
      return companies;
    }

    @Mutation(() => Company)
    async createCompany(@Args('company') company: CreateCompanyDTO): Promise<Company> {
      const companyExist = await this.companyService.findOneByName(company.name);
      if (companyExist) {
        throw new NotFoundException('Company already exist');
      }
      return await this.companyService.createCompany(company);
    }
}
