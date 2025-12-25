import {
  Controller,
  Get,
  Post,
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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientService.remove(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateClientDto);
  }
}
