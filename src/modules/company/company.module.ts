import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { CompanyProviders } from './company.provider';
import { COMPANY_REPOSITORY } from 'src/utils';

@Module({
  providers: [CompanyResolver, CompanyService, ...CompanyProviders],
  exports: [COMPANY_REPOSITORY, CompanyService, ...CompanyProviders],
})
export class CompanyModule {}
