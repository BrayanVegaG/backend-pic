import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle_Pedido } from '../Detalle_Pedido/detalle_pedido.entity'; // Updated import statement
import { Detalle_PedidoController } from '../Detalle_Pedido/detalle_pedido.controller'; // Updated import statement
import { Detalle_PedidoService } from '../Detalle_Pedido/detalle_pedido.service'; // Updated import statement
import { Pedido } from 'src/pedido/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Detalle_Pedido])],
  providers: [Detalle_PedidoService],
  controllers: [Detalle_PedidoController],
  exports: [Detalle_PedidoService]
})
export class Detalle_PedidoModule {}