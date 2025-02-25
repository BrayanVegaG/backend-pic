import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Reporte } from 'src/reporte/reporte.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,

  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({ relations: ['id_empresa', 'movimientos', 'reportes', 'usuarioRoles'] });
  }

  async findOne(id_usuario: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario }, relations: ['id_empresa', 'movimientos', 'reportes', 'usuarioRoles'] });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id_usuario} no encontrado`);
    return usuario;
  }

  async create(data: Partial<Usuario>): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async update(id_usuario: number, data: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id_usuario, data);
    return this.findOne(id_usuario);
  }

  async delete(id_usuario: number): Promise<void> {
    const usuario = await this.findOne(id_usuario);
    await this.usuarioRepository.remove(usuario);
  }

  // Método para agregar un reporte a un usuario (ejemplo de manejo de relaciones)
  async agregarReporte(id_usuario: number, dataReporte: Partial<Reporte>): Promise<Usuario> {
    const usuario = await this.findOne(id_usuario);
    const reporteRepo = await this.reporteRepository; // Asumimos que hay un repositorio para Reporte
    const reporte = reporteRepo.create({ ...dataReporte, id_usuario: usuario });
    await reporteRepo.save(reporte);
    return this.findOne(id_usuario);
  }
}