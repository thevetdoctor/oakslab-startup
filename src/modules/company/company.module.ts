import { Module } from '@nestjs/common';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { CompanyProviders } from './company.provider';
import { COMPANY_REPOSITORY } from '../../constants';

@Module({
  providers: [CompanyResolver, CompanyService, ...CompanyProviders],
  exports: [ COMPANY_REPOSITORY, CompanyService, ...CompanyProviders ]
})
export class CompanyModule {}
