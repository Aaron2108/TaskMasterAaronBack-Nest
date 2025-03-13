import { Injectable } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { Role } from 'src/common/enums/rol..enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoService {

  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ){}

  async create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    const nuevoEstado = this.estadoRepository.create(createEstadoDto);
    return await this.estadoRepository.save(nuevoEstado);
  }

  async findAll(): Promise<Estado[]> {
    return this.estadoRepository.find();
  }
  

  findOne(id: number) {
    return `This action returns a #${id} estado`;
  }

  update(id: number, updateEstadoDto: UpdateEstadoDto) {
    return `This action updates a #${id} estado`;
  }

  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
