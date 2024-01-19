import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';

describe('CustomerService', () => {
  let service: CustomerService;
  let module: TestingModule;

  beforeEach(async () => {
    const uri =
      'mongodb://root:root@localhost:27017/customers_entity?authSource=admin';
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Customer.name, schema: CustomerSchema },
        ]),
      ],
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const customer = await service.create({
      name: 'Cléber Souza',
      birthdate: '1996-12-12',
    });

    expect(customer.name).toBe('Cléber Souza');
    expect(customer.birthdate).toBe('1996-12-12');
  });
});
