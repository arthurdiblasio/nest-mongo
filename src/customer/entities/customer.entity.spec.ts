import mongoose from 'mongoose';
import { Customer, CustomerSchema } from './customer.entity';

describe('Customer Test', () => {
  it('should create a tweet', () => {
    const customer = new Customer({
      name: 'Cleber Souza',
      birthdate: '1998-12-02',
    });

    expect(customer.name).toBe('Cleber Souza');
    expect(customer.birthdate).toBe('1998-12-02');
  });

  describe('Using MongoDb', () => {
    let connection: mongoose.Mongoose;

    beforeEach(async () => {
      connection = await mongoose.connect(
        'mongodb://root:root@localhost:27017/customers_entity?authSource=admin',
      );
    });

    afterEach(async () => {
      await connection.disconnect();
    });

    it('Create a customer document', async () => {
      const CustomerModel = connection.model('Customer', CustomerSchema);
      const customer = new CustomerModel({
        name: 'Cleber Souza',
        birthdate: '1998-12-02',
      });
      await customer.save();

      const customerCreated = await CustomerModel.findById(customer._id);
      console.log(customerCreated);
    });
  });
});
