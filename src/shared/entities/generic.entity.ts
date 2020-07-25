import { UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';

export class GenericEntity extends BaseEntity{
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  // tslint:disable-next-line: variable-name
  created_at: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  // tslint:disable-next-line: variable-name
  updated_at: Date;
}