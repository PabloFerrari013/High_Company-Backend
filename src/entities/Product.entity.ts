import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index({ unique: true })
  @Column({ type: 'uuid', generated: 'uuid' })
  code: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'int' })
  price: number

  @Column({ type: 'text' })
  img_URL: string

  @Column({ type: 'int' })
  stock: number
}
