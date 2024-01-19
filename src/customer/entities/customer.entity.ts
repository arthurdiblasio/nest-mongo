import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & Document;

export type CustomerProps = {
  name: string;
  birthdate: string;
};

@Schema()
export class Customer {
  constructor(props: CustomerProps) {
    Object.assign(this, props);
  }

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthdate: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
