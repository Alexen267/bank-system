import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleType } from 'src/common/enum/role-type';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientService.findOne(id);
  }

  @Get(':id/account')
  findAccounts(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.clientService.findAccounts(id, paginationDto);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientService.remove(id);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateClientDto);
  }
}
