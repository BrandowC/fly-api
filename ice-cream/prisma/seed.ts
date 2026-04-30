import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Sembrando datos...');

  // ======== ADMIN ========
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log(`✅ Admin: ${admin.username} (contraseña: admin123)`);

  // ======== LIMPIAR VASOS ANTIGUOS (tipo 'VASO' ya no existe) ========
  await prisma.producto.deleteMany({ where: { tipo: 'VASO' } });

  // ======== PRODUCTOS (TAMAÑOS Y HELADOS) ========
  const productosData = [
    // Tamaños (GRATIS - el usuario elige uno)
    { nombre: 'Pequeño', tipo: 'TAMAÑO', precio: 0 },
    { nombre: 'Mediano', tipo: 'TAMAÑO', precio: 0 },
    { nombre: 'Grande', tipo: 'TAMAÑO', precio: 0 },
    // Helados de crema
    { nombre: 'Helado de Fresa', tipo: 'CREMA', precio: 4500 },
    { nombre: 'Helado de Chocolate', tipo: 'CREMA', precio: 4500 },
    { nombre: 'Helado de Vainilla', tipo: 'CREMA', precio: 4500 },
    { nombre: 'Helado de Mora', tipo: 'CREMA', precio: 5000 },
    { nombre: 'Helado Napolitano', tipo: 'CREMA', precio: 5500 },
    // Helados de agua
    { nombre: 'Helado de Limón', tipo: 'AGUA', precio: 3500 },
    { nombre: 'Helado de Maracuyá', tipo: 'AGUA', precio: 4000 },
    { nombre: 'Helado de Coco', tipo: 'AGUA', precio: 4000 },
  ];

  for (const data of productosData) {
    const existing = await prisma.producto.findFirst({
      where: { nombre: data.nombre },
    });
    if (!existing) {
      await prisma.producto.create({ data: { ...data, disponible: true } });
    }
  }
  console.log(`✅ ${productosData.length} productos cargados`);

  // ======== TOPPINGS ========
  const toppingsData = [
    { nombre: 'Chocolate derretido', descripcion: 'Salsa de chocolate caliente', precio: 2000 },
    { nombre: 'Salsa de caramelo', descripcion: 'Dulce caramelo cremoso', precio: 2000 },
    { nombre: 'Arequipe', descripcion: 'Arequipe casero', precio: 2500 },
    { nombre: 'Leche condensada', descripcion: 'Cremosa y dulce', precio: 1800 },
    { nombre: 'Chispas de chocolate', descripcion: 'Pequeñas chispas crujientes', precio: 1500 },
    { nombre: 'Maní tostado', descripcion: 'Maní picado y tostado', precio: 1800 },
    { nombre: 'Almendras', descripcion: 'Almendras laminadas', precio: 2200 },
    { nombre: 'Galleta Oreo', descripcion: 'Galletas Oreo trituradas', precio: 2500 },
    { nombre: 'Fresas en trozos', descripcion: 'Fresas frescas cortadas', precio: 2800 },
    { nombre: 'Banano', descripcion: 'Banano en rodajas', precio: 1800 },
    { nombre: 'Crema chantilly', descripcion: 'Crema batida dulce', precio: 2000 },
    { nombre: 'Gomitas', descripcion: 'Mix de gomitas de colores', precio: 1500 },
  ];

  for (const data of toppingsData) {
    const existing = await prisma.topping.findFirst({
      where: { nombre: data.nombre },
    });
    if (!existing) {
      await prisma.topping.create({ data: { ...data, disponible: true } });
    }
  }
  console.log(`✅ ${toppingsData.length} toppings cargados`);

  // ======== PEDIDOS DE EJEMPLO ========
  // Limpiar pedidos existentes para regenerar con detalles completos
  await prisma.pedidoDetalle.deleteMany({});
  await prisma.pedido.deleteMany({});

  // Buscar algunos productos/toppings para asociar
  const fresa = await prisma.producto.findFirst({ where: { nombre: 'Helado de Fresa' } });
  const chocolate = await prisma.producto.findFirst({ where: { nombre: 'Helado de Chocolate' } });
  const vainilla = await prisma.producto.findFirst({ where: { nombre: 'Helado de Vainilla' } });
  const coco = await prisma.producto.findFirst({ where: { nombre: 'Helado de Coco' } });
  const grande = await prisma.producto.findFirst({ where: { nombre: 'Grande' } });
  const mediano = await prisma.producto.findFirst({ where: { nombre: 'Mediano' } });

  const topChocolate = await prisma.topping.findFirst({ where: { nombre: 'Chocolate derretido' } });
  const topOreo = await prisma.topping.findFirst({ where: { nombre: 'Galleta Oreo' } });
  const topArequipe = await prisma.topping.findFirst({ where: { nombre: 'Arequipe' } });
  const topGomitas = await prisma.topping.findFirst({ where: { nombre: 'Gomitas' } });

  // Pedido 1 - Juan Pérez (pendiente)
  await prisma.pedido.create({
    data: {
      clienteNombre: 'Juan Pérez',
      telefono: '3214567890',
      direccion: 'Calle 10 # 5-20, Neiva',
      total: 12500,
      completado: false,
      detalles: {
        create: [
          ...(grande ? [{ productoId: grande.id, cantidad: 1, subtotal: 0 }] : []),
          ...(fresa ? [{ productoId: fresa.id, cantidad: 2, subtotal: 9000 }] : []),
          ...(topArequipe ? [{ productoId: fresa?.id || 1, toppingId: topArequipe.id, cantidad: 1, subtotal: 2500 }] : []),
        ],
      },
    },
  });

  // Pedido 2 - María Gómez (entregado)
  await prisma.pedido.create({
    data: {
      clienteNombre: 'María Gómez',
      telefono: '3156789012',
      direccion: 'Carrera 8 # 15-30, Neiva',
      total: 18000,
      completado: true,
      detalles: {
        create: [
          ...(grande ? [{ productoId: grande.id, cantidad: 1, subtotal: 0 }] : []),
          ...(chocolate ? [{ productoId: chocolate.id, cantidad: 2, subtotal: 9000 }] : []),
          ...(vainilla ? [{ productoId: vainilla.id, cantidad: 1, subtotal: 4500 }] : []),
          ...(topChocolate ? [{ productoId: chocolate?.id || 1, toppingId: topChocolate.id, cantidad: 1, subtotal: 2000 }] : []),
          ...(topOreo ? [{ productoId: vainilla?.id || 1, toppingId: topOreo.id, cantidad: 1, subtotal: 2500 }] : []),
        ],
      },
    },
  });

  // Pedido 3 - Carlos Rodríguez (pendiente)
  await prisma.pedido.create({
    data: {
      clienteNombre: 'Carlos Rodríguez',
      telefono: '3102345678',
      direccion: 'Av. Circunvalar # 22-15, Neiva',
      total: 9500,
      completado: false,
      detalles: {
        create: [
          ...(mediano ? [{ productoId: mediano.id, cantidad: 1, subtotal: 0 }] : []),
          ...(coco ? [{ productoId: coco.id, cantidad: 2, subtotal: 8000 }] : []),
          ...(topGomitas ? [{ productoId: coco?.id || 1, toppingId: topGomitas.id, cantidad: 1, subtotal: 1500 }] : []),
        ],
      },
    },
  });

  console.log(`✅ 3 pedidos de ejemplo creados con detalles completos`);

  console.log('');
  console.log('================================');
  console.log('🎉 Seed completado exitosamente');
  console.log('Usuario admin: admin');
  console.log('Contraseña:    admin123');
  console.log('================================');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
